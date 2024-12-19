const dbConacate = require('../configurations/db')
const fs = require('fs');
const XLSX = require('xlsx');


class task {

    constructor(taskData) {
        this.taskData = taskData
    }


    save(cb) {
        dbConacate('task', async (db) => {
            try {
                await db.updateOne(
                    {
                        name: this.taskData.name
                    },
                    {
                        $set: {
                            _id_projact: this.taskData._id_projact,
                            name: this.taskData.name,
                            Dcrshin: this.taskData.Dcrshin,//وصف
                            imprtn: this.taskData.imprtn,//الاولوية 
                            TotalHuwe: this.taskData.TotalHuwe,//   عدد ساعات العمل المتوقعة 

                            setchin: this.taskData.setchin //حالة المهة 
                        }
                    },
                    {
                        upsert: true
                    }
                )
                cb({
                    status: true

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
            dbConnection('task', async (db) => {
                try {

                    const user = await db.findOne(
                        { name: this.taskData.name }
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

    static remove(_id, cb) {
        dbConacate('task', async (db) => {
            try {
                await db.deleteOne({ _id: _id })

                cb({
                    status: true,
                    message: " doan delat "

                })
            } catch (err) {
                cb({ status: false, message: err.message })
            }
        })
    }




    exatEcealFile(cb) {

        dbConnect('task', async (db) => {

            try {

                const cursor = await db.find().toArray();

                const ass = [];
                cursor.forEach(element => {
                    const user = {
                        name: element.name,
                        TotalHuwe: element.TotalHuwe,
                        setchin: element.setchin
                    };
                    ass.push(user);
                });

                const worksheet = XLSX.utils.json_to_sheet(ass);

                const workbook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workbook, worksheet, 'data MongoDB');

                const excelFilePath = 'data.-mongodb.xlsx';
                XLSX.writeFile(workbook, excelFilePath);
                console.log(`تم إنشاء ملف Excel "${excelFilePath}" بنجاح.`);
                cb({
                    status: 200,
                    message: " is good "
                })

            } catch (error) {
                cb({
                    status: 500,
                    message: error
                })
            }
        })
    }

}

module.exports = task;

