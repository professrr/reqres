const Rabbit = require('./utils/mq')
const Crawler = require('./utils/crawler')
const dotenv = require('dotenv')
const {MongoClient} = require('mongodb')

dotenv.config({
    path: '../config.env'
})

/* Declaring config variables */
const rabbit_port = process.env.RABBIT_PORT
const rabbit_host = process.env.RABBIT_HOST
const rabbit_q_name = process.env.RABBIT_Q_NAME
const db_uri = process.env.DATABASE_URI
                        .replace('<USER>', process.env.DATABASE_USER)
                        .replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
                        .replace('<HOST>', process.env.DATABASE_HOST)
                        .replace('<PORT>', process.env.DATABASE_PORT)
                        .replace('<NAME>', process.env.DATABASE_NAME)
const db_name = process.env.DATABASE_NAME
/* - - - - - - - - - - - - */

const main = async ({crawler, channel}) => {
    channel.consume(rabbit_q_name, message => {
        const json_message = JSON.parse(message.content.toString())
        console.log('New message from RabbitMQ', json_message)
        const {status} = json_message
        crawler.setStatus({status})
        channel.ack(message)
    })
}


MongoClient.connect(db_uri, async(err, client) => {
    if (err) throw new Error(err)

    const db = client.db(db_name)

    const crawler = new Crawler()
    crawler.activateCrawling() // inject Crawler process
    crawler.connectDB({db}) // link DB to Crawler

    const rabbit = new Rabbit({
        host: rabbit_host,
        port: rabbit_port,
        q_name: rabbit_q_name,
    })
    const channel = await rabbit.initConnection()
    
    main({crawler, channel})
})
