const Rabbit = require('./utils/mq')
const Crawler = require('./utils/crawler')
const dotenv = require('dotenv')

dotenv.config({
    path: '../config.env'
})

const rabbit_port = process.env.RABBIT_PORT
const rabbit_host = process.env.RABBIT_HOST
const rabbit_q_name = process.env.RABBIT_Q_NAME

var crawler = new Crawler()
crawler.activateCrawling() // inject Crawler process

const main = async () => {
    const rabbit = new Rabbit({
        host: rabbit_host,
        port: rabbit_port,
        q_name: rabbit_q_name,
    })
    const channel = await rabbit.initConnection()

    channel.consume(rabbit_q_name, message => {
        const json_message = JSON.parse(message.content.toString())
        console.log('New message from RabbitMQ', json_message)
        const {status} = json_message
        crawler.setStatus({status})
        channel.ack(message)
    })
}

main()