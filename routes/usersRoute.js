const router = require('express').Router()

const UsersController = require('../controllers/UsersController')

router.get('/login', UsersController.getLogin)
router.post('/login', UsersController.postLogin)

router.get('/register', UsersController.getRegister)
router.post('/register', UsersController.postRegister)

router.get('/logout', UsersController.getLogout)

module.exports = router
