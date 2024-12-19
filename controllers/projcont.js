const { projact } = require('../models/index')
const { task } = require('../models/index')
const createError = require('http-errors')
const { ObjectId } = require("bson");
const jwt = require('jsonwebtoken')


const add = (req, res, next) => {

    const projactDtat = req.body

    projactDtat._id_user = req._id_user



    const projacts = new projact(projactDtat)
    projacts.projactDtat._id_user = new ObjectId(projacts.projactDtat._id_user)


    projacts.isExist()
        .then(result => {
            if (result.check) {
                return next(createError(409, result.message))
            }
        })
        .catch(err => {
            return next(createError(409, err.message))
        })


    //////
    projacts.save((result) => {

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




    task.remove(_id, resalt => {

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

const TotalCost = (req, res, next) => {

    const NameProjact = req.body;
    const projacts = new projact(NameProjact)
    projacts.TotalCostProjact((resalt) => {

        if (!resalt.status) {
            return next(createError(500, "save error"))

        } else {
            return res.status(201).json({
                status: true,
                ToalCost: TotalCostProjact


            })
        }
    })



}


module.exports = { add, romve, TotalCost }