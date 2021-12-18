const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
const Rabbit = require('./utils/mq')

dotenv.config({
    path: '../config.env'
})

const rabbit_port = process.env.RABBIT_PORT
const rabbit_host = process.env.RABBIT_HOST
const rabbit_q_name = process.env.RABBIT_Q_NAME

const db_uri = process.env.DATABASE_URI
                        .replace('<USER>', process.env.DATABASE_USER)
                        .replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
                        .replace('<HOST>', process.env.DATABASE_HOST)
                        .replace('<PORT>', process.env.DATABASE_PORT)
                        .replace('<NAME>', process.env.DATABASE_NAME)

const port = process.env.API_PORT

const db_name = process.env.DATABASE_NAME

MongoClient.connect(db_uri, async(err, client) => {
    if (err)
        return console.log(err)
    
    const app = require('./app')
    const db = client.db(db_name)
    const rabbit = new Rabbit({
        host: rabbit_host,
        port: rabbit_port,
        q_name: rabbit_q_name,
    })
    await rabbit.initConnection()
    
    app.locals.rabbit = rabbit
    app.locals.db = db
    app.listen(port, () => {
        console.log(`Application is running on port ${port}`)
    });
    
})

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...')
    console.log(err)
    process.exit(1)
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...')
    console.log(err)
    process.exit(1)
});