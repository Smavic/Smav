const tv = require('express').Router()
const tvController = require('../controllers/tvShowController')

tv.get('/search',tvController.getMoviesData)
tv.get('/homepage',tvController.homePage)


module.exports = tv