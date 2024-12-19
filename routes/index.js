const user = require('./user')
const ass = require('./projact')
const zs = require('./task')
const see = require('./SeePaag')
module.exports = (app) => {

    app.post('/', (req, res, next) => {
        res.status(200).json({
            status: true,
            message: null,
        })

    })
    app.use('/user', user)
    app.use('/ass', ass)
    app.use('/see', see)
    app.use('/zs', zs)

}