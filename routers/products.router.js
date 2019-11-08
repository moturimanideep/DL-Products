const express = require('express');
const router = express.Router();
// const productCtrl = require('../controllers/products.ctrl');
// router.get('/products', productCtrl.getProducts);
// router.get('/product/:id', productCtrl.getProductByID);
// router.post('/addProduct', productCtrl.addProduct);
// router.put('/updateProduct', productCtrl.update);
// router.delete('/deleteProduct', productCtrl.delete);


const dbProductCtrl = require('../controllers/db-product.ctrl');

router.get('/products', dbProductCtrl.getProducts);
router.get('/product/:id', dbProductCtrl.getProductByID);
router.post('/addProduct', dbProductCtrl.addProduct);
router.put('/updateProduct', dbProductCtrl.update);
router.delete('/deleteProduct', dbProductCtrl.delete);

module.exports = router;