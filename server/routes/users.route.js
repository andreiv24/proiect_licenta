const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

router.route('/profil')
.get(auth('readOwn','profil'),usersController.profil)
.patch(auth('updateOwn','profil'),usersController.updateProfil)
router.patch('/email',auth('updateOwn','profil'), usersController.updateUserEmail)
router.get('/verificare', usersController.verifyAccount)

module.exports = router;