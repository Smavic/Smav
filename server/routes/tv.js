const tv = require('express').Router()
const tvController = require('../controllers/tvShowController')

tv.get('/',tvController.getMoviesData)

module.exports = tv