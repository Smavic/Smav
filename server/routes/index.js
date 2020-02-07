const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const movieRoute = require("./movie")
const animesRouter = require('./animes');
const tvRouter = require('./tv');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/users", usersRouter);
router.use("/movie", movieRoute)
router.use("/animes", animesRouter);
router.use("/tv", tvRouter);

module.exports = router;
