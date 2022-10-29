const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const siteController = require('../controllers/site.controller');

router.route('/')
.post(auth('createAny','site'), siteController.postDateSite)
.get(siteController.getDateSite)
.patch(auth('updateAny','site'), siteController.actualizareDateSite)

module.exports = router;