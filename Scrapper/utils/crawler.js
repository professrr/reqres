const {parseVersionJS} = require('./parser')
const {delay} = require('./features')
const {MongoError} = require('mongodb')

class Crawler {
    constructor() {
        this.status = false // Status of Crawler: false -> do not crawl / true -> crawl
        this.delay_time = 60000 // 1 min
        this.total_pages = 12 // 12 reqres.in total_pages
        this.per_page = 1 // 1 User per page
        this.current_page = 1 // Curent reqres.in page
        this.batch_size = 2 // Chunk size of urls
        this.max_retries = 3 // Max retries if URL unreachable
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
                const urls = this.prepareURLs() // Create required urls
                const result = await this.crawl({urls}) // Scrape all of urls
                const users = result.map(attempt => attempt.response.json.data) // Map result to users
                await this.saveOnlyNewUsers({users: users.flat(1)}) // Save only new users to db
                await delay(this.delay_time) // 1 min delay
            }
            await delay(100)
        }
    }

    prepareURLs() {
        const urls = []
        for(let i = 0; i < this.batch_size; i++) {
            if(this.current_page <= this.total_pages)
                urls.push({
                    request: {
                        url: 'https://reqres.in/api/users',
                        method: 'GET',
                        query: {
                            'per_page': this.per_page,
                            'page': this.current_page
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                })
            this.current_page += 1
        
        }
        if(this.current_page > this.total_pages) {
            console.log('current_page is cleared to 1, so the crawl process will repeat')
            this.current_page = 1
        }
        return urls
    }

    crawl({urls}) {
        return new Promise(async(resolve, reject) => {
            try {
                const total_only_successful = await parseVersionJS(urls, this.batch_size, 1000, this.max_retries)
                resolve(total_only_successful)
            } catch(err) {
                reject(err)
            }
        })
    }

    saveOnlyNewUsers({users}) {
        return new Promise(async(resolve, reject) => {
            try {
                for (const user of users)
                    await this.insertOnlyNewUser({user})

                resolve()
            } catch(err) {
                reject(err)
            }
        })
    }

    insertOnlyNewUser({user}) {
        return new Promise(async(resolve, reject) => {
            try {
                if(this.db === undefined) reject('Error! DB is undefined')

                const User = this.db.collection('users')
                const insertInfo = await User.insertOne(user)

                resolve(insertInfo)
            } catch(err) {
                if (err instanceof MongoError && err.code == 11000) {
                    console.log(`User with id = ${err.keyValue.id} already exist, skipping insertion`)
                    resolve()
                }
                else
                    reject(err)
            }
        })
    }

    connectDB({db}) {
        this.db = db
    }
}

module.exports = Crawler