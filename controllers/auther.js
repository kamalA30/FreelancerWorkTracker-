const createError = require('http-errors')
const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const { readFileSync } = require('fs')

const signup = (req, res, next) => {
    const usetreData = req.body

    const vali = User.validate(usetreData)
 
    if (vali.error) {
        return next(createError(401, vali.error.message))
    }



    const use = new User(usetreData);

    use.isExist()
        .then(result => {
            if (result.check) {
                return next(createError(409, result.message))
            }
        })
        .catch(err => {
            return next(createError(409, err.message))
        })

    //////////////

    use.save((status) => {
        try {
            if (status.status) {
                res.status(201).json({
                    status: true,
                    message: "User has been created successfully"
                })
            } else {
                return next(createError(401, status.message))


            }
        } catch (err) {

            return next(createError(500, err.message))

        }
    })

}


const login = (req, res, next) => {

    User.login(req.body, (result) => {

        //   const id = result._id
        const secretKey = readFileSync('./configurations/as.key')


        const token = jwt.sign(
            {
                _id_user: result._id
            }, secretKey
        )


        /** 
                if (!result.status) {
                    res.status(500).json({
                        status: false,
                        token: result.message
        
                    })
        
                }*/


        res.status(200).json({
            status: true,
            result: result._id,
            token: token


        })

    })




}

module.exports = { signup, login }