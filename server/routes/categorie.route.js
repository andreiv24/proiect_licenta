const express = require('express');
const categorieController = require('../controllers/categorie.controller');
const router = express.Router();
const auth = require('../middleware/auth');

router.route('/categorie/:id')
.get(categorieController.getCategorie)
.delete( auth('deleteAny','categorie'), categorieController.deleteCategorie )
.patch( auth('updateAny','categorie'), categorieController.editareCategorie )

router.post('/categorie', auth( 'createAny','categorie' ), categorieController.adaugareCategorie)
router.get('/all', categorieController.getCategorii)

module.exports = router;