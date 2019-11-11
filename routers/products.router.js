const express = require('express');
const router = express.Router();
// const productCtrl = require('../controllers/products.ctrl');
// router.get('/products', productCtrl.getProducts);
// router.get('/product/:id', productCtrl.getProductByID);
// router.post('/addProduct', productCtrl.addProduct);
// router.put('/updateProduct', productCtrl.update);
// router.delete('/deleteProduct', productCtrl.delete);


// const dbProductCtrl = require('../controllers/db-product.ctrl');
const PromisesProductCtrl = require('../controllers/promises-product.ctrl');

router.get('/products', PromisesProductCtrl.getProducts);
router.get('/products/:pageIndex/:pageSize', PromisesProductCtrl.getProductsByIndex);
router.get('/product/:id', PromisesProductCtrl.getProductByID);
router.post('/addProduct', PromisesProductCtrl.addProduct);
router.put('/updateProduct', PromisesProductCtrl.update);
router.delete('/deleteProduct', PromisesProductCtrl.delete);

module.exports = router;