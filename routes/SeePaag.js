const { Router } = require('express')

const { getProjact, getOneProjact, getProjactPagesCount } = require('../controllers/seeyAll')

const router = Router()
router.get('/getProjact', getProjact)
    .get('/pages-count', getProjactPagesCount)
    .get('/getOneProjact/:id', getOneProjact)


module.exports = router;