const AppError = require('../utils/appError');
const reqresModel = require('../models/reqresModel');

exports.getUsers = async(req, res, next) => {
    try {
        const {page, page_size} = req.query

        const users = await reqresModel.getUsers({
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

        const user = await reqresModel.createUser({
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

    } catch(err) {
        next(err)
    }
}