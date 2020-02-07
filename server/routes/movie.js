'use strict'

const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.get('/',movieController.getMovies)
router.post('/search', movieController.searchMovie)

module.exports = router