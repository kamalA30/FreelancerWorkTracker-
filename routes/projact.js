const { Router } = require('express')
const { auther } = require('../middlewares/index')
const { add, romve, TotalCost } = require('../controllers/projcont')

const router = Router()
router.post('/add', auther, add)
    .delete('/romve/:id', romve)
    .post('/total', TotalCost)



module.exports = router;
