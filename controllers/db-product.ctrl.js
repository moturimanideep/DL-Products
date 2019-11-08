const productModel = require('../models/product.model');
const dbProductCtrl = {
    getProducts: function(req, res){
        productModel.find(function(err, products){
            if(products){
                res.json(products);
                res.status(200);
            } else {
                res.send('failed to fetch products');
                res.status(400);
            }
        })
    },
    getProductByID: function(req, res){
        let id = req.params.id;
        productModel.findById(id, (err, product) => {
            if(product){
                res.send(product);
                res.status(200);
            }else{
                res.send('Not found');
                res.status(404);
            }
        })
    },
    addProduct: function(req, res){
        productModel.findOne({name: req.body.name}, function(err, product){
            if(product){
                res.send('Already exist');
                res.status(200);
            } else {
                let product = new productModel(req.body);
                product.save(function (err, product) {
                    if (err) {
                        res.send('Failed in adding');
                        res.status(200);
                    } else {
                        res.send('Inserted successfully');
                        res.status(200);
                    }
                })
            }
        })
    },
    update: function(req, res){
        let id = req.body._id;
        productModel.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                price: req.body.price,
                inStock: req.body.inStock 
            }
        }, (err, product) => {
            if(err){
                res.send('Not found');
                res.status(200);
            }else{
                res.send('Updated successfully');
                res.status(200);
            }
        })
    },
    delete: function(req, res){
        let id = req.query.id;
        productModel.findByIdAndRemove(id, (err, product) => {
            if(product){
                res.send('Deleted successfully');
                res.status(200);
            }else{
                res.send('failed in deleting');
                res.status(200);
            }
        })
    }
}

module.exports = dbProductCtrl;