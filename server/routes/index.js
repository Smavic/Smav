const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const tvRouter = require('./tv');
const animesRouter = require('./animes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/users", usersRouter);
router.use("/tv", tvRouter);
router.use("/animes", animesRouter);

module.exports = router;
