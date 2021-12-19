
class Crawler {
    constructor() {
        this.status = false
        this.delay_time = 10000 // 10 sec
        this.reqres = {}
    }

    setStatus({status}) {
        console.log(`Setting status to ${status}`)
        if('boolean' === typeof status)
            this.status =  status
        return this.status
    }

    async activateCrawling() {
        console.log('Crawler is injected. Waiting for updates...')
        while (true) {
            while(this.status === true) {
                const result = await this.crawl()
            
                // await this.save(result)
                await this.delay(this.delay_time)
            }
            await this.delay(100)
        }
    }

    crawl({urls}) {
        return new Promise(async(resolve, reject) => {
            try {
                console.log('Starting crawling...')
                await this.delay(3000)
                console.log(`parsing...`)
                await this.delay(3000)
                console.log(`parsing...`)
                await this.delay(3000)
                console.log(`parsing...`)
                await this.delay(3000)
                console.log(`parsing...`)
                await this.delay(3000)
                console.log(`parsing...`)
                await this.delay(3000)
                console.log(`parsing...`)
                console.log('Finished crawling')
                resolve(`Crawled`)
            } catch(err) {
                reject(err)
            }
        })
    }

    save() {
        return new Promise(async(resolve, reject) => {
            try {

                resolve()
            } catch(err) {
                reject(err)
            }
        })
    }

    delay(delay_time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, delay_time);
        });
    }
}

module.exports = Crawler