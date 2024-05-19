const express = require('express');
const { login } = require('../controllers/authControllers');
const { register } = require('../controllers/registerController');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;
