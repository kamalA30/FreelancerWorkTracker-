const dbConacate = require('../configurations/db')
const { hashSync, compareSync } = require('bcryptjs')
const createError = require('http-errors')

const { schema } = require('../validators/ValidUser')
class User {

    constructor(usetreData) {
        this.usetreData = usetreData
    }

    save(cb) {
        dbConacate('pass', async (db) => {
            try {
                const passCrypt = hashSync(this.usetreData.password, 12)
                this.usetreData.password = passCrypt

                await db.insertOne(this.usetreData)
                    .then(result => {
                        cb({
                            status: true,
                            _user_id: result.insertedId
                        })

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
            dbConacate('pass', async (db) => {
                try {
                    const user = await db.findOne({
                        '$or': [
                            { username: this.usetreData.username },
                            { email: this.usetreData.email }
                        ]
                    })

                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else {
                        if (user.email === this.usetreData.email) {
                            resolve({
                                check: true,
                                message: 'The email is already used'
                            })
                        } else if (user.username === this.usetreData.username) {
                            resolve({
                                check: true,
                                message: 'The username is already used'
                            })
                        }
                    }
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    static validate(userData) {
        try {
            const validationResult = schema.ValidUsers1.validate(userData)
            return validationResult;
        } catch (err) {
            return false;
        }
    }






    static login(userData, cb) {
        try {
            dbConacate('pass', async (db) => {
                const find = await db.findOne({ username: userData.username })

                if (find) {
                    if (!compareSync(userData.password, find.password)) {
                        cb({
                            status: false,
                            message: 'badd'
                        })
                    } else {
                        cb(find)


                    }
                } else {
                    cb({
                        status: false,
                        message: 'badd'
                    })
                }
            })
        } catch (err) {
            console.log("error", err);
        }





    }


}

module.exports = User