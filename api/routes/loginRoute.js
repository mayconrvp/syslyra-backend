const { Router } = require('express');
const LoginController = require('../controllers/LoginController');

const router = Router()
router
 .post('/login', LoginController.index)

module.exports = router