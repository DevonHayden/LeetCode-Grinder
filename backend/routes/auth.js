const express = require('express')
//importing express
const router = express.Router()
//similar to app, but only for auth
const {register, login} = require('../controllers/authController')
//importing login and register funcs 
router.post('/register', register)
//when post run register func
router.post('/login', login)
//when post run login func

module.exports = router