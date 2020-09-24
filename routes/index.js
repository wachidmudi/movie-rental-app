const router = require('express').Router()

const HomeController = require('../controllers/HomeController')

const moviesRoute = require('./moviesRoute')

router.get('/', HomeController.home)
router.use('/movies', moviesRoute)

module.exports = router
