const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const movieRoute = require("./movie")
const tv = require('./tv');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/users", usersRouter);
router.use("/tv", tv);
router.use("/movie", movieRoute)


module.exports = router;
