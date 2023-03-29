const {Router } = require('express');
const { login, register } = require('../controllers/apiAuth');

const authRouter = Router();

authRouter
.get('/login', login)
.post('/register', register)

module.exports = authRouter;