const AppError = require('../utils/appError')

exports.getPagination = ({
    collection,
    filter,
    page,
    results,
    page_size
}) => {
    return new Promise(async(resolve, reject) => {
        try {
            const count = await collection.count(filter ? filter : {})            

            resolve({
                current_page: page,
                results,
                total_pages: Math.ceil(count / page_size) 
            })
        } catch(err) {
            reject(err)
        }
    })
}

exports.getUsers = ({
    search_str,
    db,
    page,
    page_size
}) => {
    return new Promise(async(resolve, reject) => {
        try {
            const User = db.collection('users')

            const users = search_str !== undefined ? await User.aggregate([{
                                        $addFields: {
                                            "full_name": { $concat: [ "$first_name", ' ', "$last_name" ] }
                                        }
                                    }, {
                                        $match: {
                                            "$or": [
                                                {"first_name": new RegExp(search_str, 'i')},
                                                {"last_name": new RegExp(search_str, 'i')},
                                                {"full_name": new RegExp(search_str, 'i')}
                                            ]    
                                        }    
                                    }])
                                .limit(page_size ? parseInt(page_size) : 10)
                                .skip(((page ? parseInt(page)-1 : 0) * (page_size ? parseInt(page_size) : 10)))
                                .sort({_id: -1}) : 
                            await User
                                .find()
                                .limit(page_size ? parseInt(page_size) : 10)
                                .skip(((page ? parseInt(page)-1 : 0) * (page_size ? parseInt(page_size) : 10)))
                                .sort({_id: -1})

            const data = await users.toArray()

            const pagination = await this.getPagination({
                collection: User,
                page: page ? parseInt(page) : 1,
                page_size: page_size ? parseInt(page_size) : 10,
                results: data.length,
            })

            resolve({
                pagination,
                data,
            })
        } catch(err) {
            reject(err)
        }
    })
}

exports.createUser = ({
    db,
    id,
    email,
    first_name,
    last_name,
    avatar,
}) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!id || !email || !first_name || !last_name || !avatar)
                throw new AppError(404, 'fail', 'Обязательные параметры: id, email, first_name, last_name, avatar');

            const User = db.collection('users')
            const user = await User.insertOne({
                id,
                email,
                first_name,
                last_name,
                avatar,
            })

            resolve(user)
        } catch(err) {
            reject(err)
        }
    })
}