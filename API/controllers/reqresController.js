const AppError = require('../utils/appError');
const userModel = require('../models/userModel');

exports.getUsers = async(req, res, next) => {
    try {
        const {page, page_size, search_str} = req.query

        const users = await userModel.getUsers({
            search_str,
            db: req.app.locals.db,
            page, page_size
        })

        res.status(200).json({
            status: 'success',
            ...users
        })
    } catch(err) {
        next(err)
    }
}

exports.createUser = async(req, res, next) => {
    try {
        const {id, email, first_name, last_name, avatar} = req.body

        if(!id || !email || !first_name || !last_name || !avatar)
            throw new AppError(404, 'fail', 'Обязательные body параметры: id, email, first_name, last_name, avatar')

        const user = await userModel.createUser({
            db: req.app.locals.db,
            id, email, first_name, last_name, avatar
        })

        res.status(200).json({
            user
        })
    } catch(err) {
        next(err)
    }
}

exports.activateCrawler = async(req, res, next) => {
    try {
        const {status} = req.body

        if(status === undefined)
            throw new AppError(404, 'fail', 'Обязательный body параметр: status')

        const {rabbit} = req.app.locals

        const result = await rabbit.sendMessageToQ({message: {status}})

        res.status(200).json({
            result
        })
    } catch(err) {
        next(err)
    }
}