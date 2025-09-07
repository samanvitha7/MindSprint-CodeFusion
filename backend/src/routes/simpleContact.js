// routes/simpleContact.js
const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/simpleContactController');

router.post('/', sendContactEmail);

module.exports = router;
