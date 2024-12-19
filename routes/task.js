const { Router } = require('express')

const { add, romve, exportExaelData } = require('../controllers/taskCont')

const router = Router()
router.post('/addTask', add)
    .post('/ExportExaelData', exportExaelData)
    .delete('/romve/:id', romve)


module.exports = router;