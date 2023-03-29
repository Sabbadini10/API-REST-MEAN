const {Router } = require('express');
const { login, register } = require('../controllers/apiAuth');
const registerValidation = require('../validators/registerValidation');
const loginValidation = require('../validators/loginValidation')

const authRouter = Router();

authRouter
.post('/login', loginValidation, login)
.post('/register', registerValidation, register)

module.exports = authRouter;