const Rabbit = require('./utils/mq')
const dotenv = require('dotenv')

dotenv.config({
    path: '../config.env'
})

const rabbit_port = process.env.RABBIT_PORT
const rabbit_host = process.env.RABBIT_HOST
const rabbit_q_name = process.env.RABBIT_Q_NAME

const main = async () => {
    const rabbit = new Rabbit({
        host: rabbit_host,
        port: rabbit_port,
        q_name: rabbit_q_name,
    })
    const channel = await rabbit.initConnection()
    
    channel.consume(rabbit_q_name, message => {            
        console.log(JSON.parse(message.content.toString()))
        channel.ack(message)
    })
}

main()