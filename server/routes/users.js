const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/loginGoogle', userController.googleLogin)

module.exports = router;
