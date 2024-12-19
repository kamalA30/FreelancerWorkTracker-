
const dbConacate = require('../configurations/db')
const schema = require('../validators/index')
const { ObjectId } = require("bson");

class projact {

    constructor(projactDtat) {
        this.projactDtat = projactDtat;
    }

    save(cb) {
        dbConacate('Projects', async (db) => {
            try {
                await db.updateOne(

                    {
                        name: this.projactDtat.name
                    },
                    {
                        $set: {
                            _id_user: this.projactDtat._id_user,
                            name: this.projactDtat.name,
                            Number_tasks: this.projactDtat.Number_tasks,
                            Cost: this.projactDtat.Cost
                        }
                    },
                    {
                        upsert: true
                    }
                )
                cb({
                    status: true,
                    projactName: this.projactDtat.name

                })
            } catch (err) {
                cb({
                    status: false,
                    message: err.message
                })
            }
        })


    }



    isExist() {
        return new Promise((resolve, reject) => {
            dbConnection('Projects', async (db) => {
                try {
                    const user = await db.findOne(
                        { name: this.projactDtat.name }
                    )
                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else {
                        resolve({
                            check: true,
                            message: 'The name is already used'
                        })
                    }
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    static validate(uata) {
        try {
            const validationResult = schema.valiProj.validate(uata)
            return validationResult;
        } catch (err) {
            return false;
        }
    }

    static remove(_id, cb) {
        dbConacate('Projects', async (db) => {
            try {
                await db.deleteOne({ _id: _id })

                cb({
                    status: true,
                    message: " suss delat "

                })
            } catch (err) {
                cb({ status: false, message: err.message })
            }
        })
    }

    Numbertasks(_id_projacte, cb) {

        dbConacate('Projects', async (db) => {

            try {
                const fid = await db.findOne({ _id: _id_projact }).toArray();

                const id_projact = new ObjectId(fid._id)

                const pipeline = [
                    {
                        $group: {
                            _id: "$_id_projact",
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ];
                const result = await db.aggregate(pipeline).toArray();
                const Number_tasks = result.$sum

                await db.updateOne(

                    {
                        _id: id_projact
                    },
                    {
                        $set: {

                            Number_tasks: Number_tasks,
                        }
                    },
                    {
                        upsert: false
                    }
                )
                cb({
                    status: true,
                    message: " suss delat "

                })

            } catch (err) {
                cb({ status: false, message: err.message })

            }



        })

    }


    TotalCostProjact(NameProjact, cb) {
        try {

            dbConacate('Projects', async (db) => {
                const fin = await db.findOne(
                    { name: NameProjact }
                ).toArray();
                const cost = fin.Cost;
                dbConacate('task', async (db) => {
                    const pipeline = [
                        {
                            $match: {
                                setchin: "done"
                            }
                        },
                        {
                            $group: {
                                _id: "$mass",

                                totalamount: { $sum: "$TotalHuwe" }
                            }
                        }
                    ];
                    const result = await db.aggregate(pipeline).toArray();
                    cb({
                        status: true,
                        TotalCostProjact: result * cost

                    })
                })



            })
        } catch (err) {
            cb({
                status: false,
                message: err

            })

        }

    }





}


module.exports = projact 