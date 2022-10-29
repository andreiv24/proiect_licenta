const express = require('express');
const router = express.Router();
const produseController = require('../controllers/produse.controller');
const auth = require('../middleware/auth');
const { adaugareProdusValidator } = require('../middleware/validations');
const formidableMiddleware = require('express-formidable');

router.post('/', auth('createAny','produs'), adaugareProdusValidator, produseController.adaugareProdus);

router.route('/produs/:id')
.get(produseController.getProdusById)
.patch(auth('updateAny','produs'),produseController.updateProdusById)
.delete(auth('deleteAny','produs'),produseController.deleteProdusById);

router.get('/all', produseController.toateProdusele);
router.post('/paginate/all', produseController.paginateProduse);

router.post('/upload', auth('createAny','produs'),formidableMiddleware(),produseController.uploadImagine);

module.exports = router;