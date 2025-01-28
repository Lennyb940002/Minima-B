const express = require('express');
const router = express.Router();
const { saveEmail } = require('../controllers/emailController');

// Route POST pour enregistrer une adresse email
router.post('/', saveEmail);

module.exports = router;