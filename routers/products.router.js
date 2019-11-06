const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/products.ctrl');

router.get('/products', productCtrl.getProducts);
router.get('/product/:id', productCtrl.getProductByID);
router.post('/addProduct', productCtrl.addProduct);

module.exports = router;