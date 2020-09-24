const router = require('express').Router()

const { checkLogin } = require("../middleware/login")
const TransactionsController = require('../controllers/TransactionsController')

router.get('/', checkLogin, TransactionsController.getAll)
router.get('/:userId/:movieId', checkLogin, TransactionsController.postAdd)

module.exports = router
