const { Router } = require('express')

const { signup, login } = require('../controllers/auther')

const router = Router()
router.post('/use', signup)
      .post('/ass', login)
 

module.exports = router;