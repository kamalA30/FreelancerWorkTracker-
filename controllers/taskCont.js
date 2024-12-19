const { task } = require('../models/index');
const { projact } = require('../models/index');

const createError = require('http-errors')


const add = (req, res, next) => {

    const taskDtat = req.body;

    const Task = new task(taskDtat);
    const _id_projact = taskDtat._id_projact

    const Projact = new projact(_id_projact);

    Task.isExist()
        .then(result => {
            if (result.check) {
                return next(createError(409, result.message))
            }
        })
        .catch(err => {
            return next(createError(409, err.message))
        })

    Task.save((result) => {

        if (!result.status) {
            return next(createError(500, "save error"))



        } else {


            return res.status(201).json({
                status: true,
                message: " susss add "


            })
        }

    })

    Projact.Numbertasks((result) => {
        if (!result.status) {
            return next(createError(500, "save error"))
        } else {
            return res.status(201).json({
                status: true,
                message: " susss add "
            })
        }

    })



}


const romve = (req, res, next) => {

    const id = req.params.id
    const _id = new ObjectId(id)

    projact.remove(_id, resalt => {

        if (!resalt.status) {
            res.status(400).json({
                status: false,
                message: resalt.message
            })
        }
        res.status(200).json({
            status: true,
            message: resalt.message
        })

    })


}

const exportExaelData = (req, res, next) => {
    const Task = new task();
    Task.exatEcealFile((result) => {
        if (!result.status) {
            return next(createError(500, "save error"))
        } else {
            return res.status(201).json({
                status: true,
                message: " susss add "

            })
        }


    })

}


module.exports = { add, romve, exportExaelData }
