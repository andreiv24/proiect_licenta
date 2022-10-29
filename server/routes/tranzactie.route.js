const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const tranzactieController = require('../controllers/tranzactie.controller');

router.route('/')
.post(auth(), tranzactieController.adaugareTranzactie)

module.exports = router;