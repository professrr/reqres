const fetch = require('node-fetch')
const {delay, JSONparse} = require('./features')

const batchArray = (arr, size) => {
    const result = []
    while (arr.length > 0) {
        const batch = arr.splice(0,size)
        result.push((return_urls=false) => {
            const promises = []
            const request_info = []
            for(const url of batch) {
                promises.push(url.request())
                request_info.push(url.request_info)
            }
            return !return_urls ? promises : request_info
        })
    }
    return result
}

const parse = async (urls, delay_time, batch_size) => {
    const batch_of_reponses = []
    const successful = []
    const failed = []

    const batch_arr = batchArray(urls, batch_size)
    
    for(const batch of batch_arr) {
            const requests_info = batch(true)
            console.log(requests_info.length);
            console.log(`Starting sending requests ${Date.now()}`);
            const responses = await Promise.all(batch(false));
            console.log(`Done sending requests ${Date.now()}`);
            batch_of_reponses.push({responses, requests_info})
            await delay(delay_time)
    }

    for(const pair of batch_of_reponses) {
        const {responses, requests_info} = pair
        for(let i = 0; i < responses.length; i++) {
            const status = await responses[i].status;
            const ok = await responses[i].ok;
            const headers = await responses[i].headers 
            // const json = await responses[i].json();
            const res_body = await responses[i].text();
            const json_info = await JSONparse(res_body);

            if(!responses[i].ok) {
                failed.push({
                    response: {
                        status,
                        ok,
                        headers,
                        json: json_info.ok === true ? json_info.data : undefined,
                        text_body: json_info.ok === false ? json_info.data : undefined
                    },
                    request: requests_info[i]
                })
                console.log('Failed request!!!', status, json_info.ok === true ? json_info.data : undefined, requests_info[i]);
            }
            else {
                successful.push({
                    response: {
                        status,
                        ok,
                        headers,
                        json: json_info.ok === true ? json_info.data : undefined,
                        text_body: json_info.ok === false ? json_info.data : undefined
                    },
                    request: requests_info[i]
                })
                console.log('Successful request :)', status, Date.now())
            }
        }
    }

    return {successful, failed}
}

const prepareURLs = (urls) => {
    return urls.map(one_url => {
        const {url, method, headers, body, query} = one_url.request;

        const wrapped_url = new URL(url)
        wrapped_url.search = new URLSearchParams(query).toString();

        return {
            request: () => 
                        fetch(wrapped_url, {
                            method,
                            headers,
                            body: body ? JSON.stringify(body) : undefined
                        })
                    ,
            request_info: {url, method, headers, body, query}
        }
    })
}

exports.parseVersionJS = async (urls, batch_size=20, delay_time=1000, max_retries=3) => {
    let total_only_successful = []
    
    const prepared_urls = prepareURLs(urls);
    
    console.log(`Starting parsing. Total urls - ${prepared_urls.length}.\nConfig:\n  * batch_size: ${batch_size} \n  * delay_time: ${delay_time} \n  * max_retries: ${max_retries} \n`);
    const {failed, successful} = await parse(prepared_urls, delay_time, batch_size);
    console.log(`Finished parsing! successfull - ${successful.length}, failed - ${failed.length}`);
    const repeated = failed.length && max_retries ? await parseVersionJS(failed, batch_size, delay_time, max_retries-1) : []

    total_only_successful.push(...successful)
    if(repeated.length) total_only_successful.push(...repeated)

    return total_only_successful;
}