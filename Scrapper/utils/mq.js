const amqplib = require('amqplib')

class Rabbit {
    constructor({host, port, q_name}) {
        this.host = host
        this.port = port
        this.q = q_name
        this.options = {durable: true, maxLength: 1}
    }

    initConnection() {
        return new Promise(async(resolve, reject) => {
            try {
                const q_connection = await amqplib.connect(`amqp://${this.host}:${this.port}`, {timeout: 1000})
                const channel = await q_connection.createChannel()
                await channel.assertQueue(this.q, this.options)
                this.channel = channel
                console.log('RabbitMQ is connected')
                resolve(channel)
            } catch(err) {
                reject(err)
            }
        })
    }
}

module.exports = Rabbit