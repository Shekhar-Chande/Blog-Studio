const express = require('express');
const { signupUser, signinUser } = require('../controllers/authController');
const userRoute = express.Router();


userRoute.post('/api/usersignup', signupUser)

userRoute.post('/api/usersignin', signinUser)

module.exports = userRoute