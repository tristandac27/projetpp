const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authControllers');
const { register } = require('../controllers/registerController')

router.post('/login', login); // Assurez-vous que `login` est une fonction de rappel valide

module.exports = router;
