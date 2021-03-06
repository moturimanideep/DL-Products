const express = require('express');
const router = express.Router();
const multer  = require('multer');
// const productCtrl = require('../controllers/products.ctrl');
// router.get('/products', productCtrl.getProducts);
// router.get('/product/:id', productCtrl.getProductByID);
// router.post('/addProduct', productCtrl.addProduct);
// router.put('/updateProduct', productCtrl.update);
// router.delete('/deleteProduct', productCtrl.delete);


// const dbProductCtrl = require('../controllers/db-product.ctrl');
// const PromisesProductCtrl = require('../controllers/promises-product.ctrl');
const AsyncAwaitProductCtrl = require('../controllers/asyncawait-product.ctrl');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    }, 
    filename: function(req, file, cb){
        let filename = Date.now() + '-' + file.originalname;
        req.body.image = filename;
        cb(null, filename)
    }
});
const upload = multer({storage: storage});


router.get('/products', AsyncAwaitProductCtrl.getProducts);
router.get('/products/:pageIndex/:pageSize', AsyncAwaitProductCtrl.getProductsByIndex);
router.get('/product/:id', AsyncAwaitProductCtrl.getProductByID);
router.post('/addProduct', upload.single('image'), AsyncAwaitProductCtrl.addProduct);
router.put('/updateProduct', AsyncAwaitProductCtrl.update);
router.delete('/deleteProduct', AsyncAwaitProductCtrl.delete);

module.exports = router;