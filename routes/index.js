const router = require('express').Router()

const HomeController = require('../controllers/HomeController')

const moviesRoute = require('./moviesRoute')
const transactionsRoute = require('./transactionsRoute')
const usersRoute = require('./usersRoute')

router.get('/', HomeController.home)
router.use('/movies', moviesRoute)
router.use('/transactions', transactionsRoute)

router.use('/users', usersRoute)

module.exports = router
