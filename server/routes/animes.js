const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

router.get("/homepage", animeController.homepage);
router.get("/search", animeController.search);

module.exports = router;