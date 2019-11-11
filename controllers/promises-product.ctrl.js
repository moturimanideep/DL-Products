const productModel = require('../models/product.model');
const dbProductCtrl = {
    getProducts: function(req, res){
        productModel.find()
            .exec()
            .then( (response) =>{
                res.json(response);
                res.status(200);
            }).catch( (error) => {
                res.send('failed to fetch products');
                res.status(400);
            });
    },
    getProductsByIndex: function(req, res){
        productModel.count()
            .exec()
            .then( cnt => {
                let pageIndex = +req.params.pageIndex || 0;
                let pageSize = +req.params.pageSize || 10;
                let totalPages = Math.ceil(cnt/pageSize);
                let metadata = {
                    count: cnt,
                    totalPages: totalPages,
                    hasPrevious: pageIndex > 0,
                    hasNext: pageIndex < totalPages - 1
                }
                let productsToSkip = Math.ceil(pageIndex*pageSize);
                productModel.find()
                    .skip(productsToSkip)
                    .limit(pageSize)
                    .exec()
                    .then( (products) => {
                        let response = {
                            metadata: metadata,
                            data: products
                        }
                        res.json(response);
                        res.status(200);
                    }).catch( error => {
                        res.send(error);
                        res.status(200);
                    });
            })
    },
    getProductByID: function(req, res){
        let id = req.params.id;
        productModel.findById(id)
            .exec()
            .then(function(response){
                res.send(response);
                res.status(200);
            }).catch((error) => {
                res.send('Not found');
                res.status(404);
            })
    },
    addProduct: function(req, res){
        productModel.findOne({name: req.body.name})
            .exec()
            .then( (response) => {
                if(response){
                    res.send('Already exist');
                    res.status(200);
                } else {
                    let product = new productModel(req.body);
                    product.save()
                        .then( (response) => {
                            res.send('Inserted successfully');
                            res.status(200); 
                        }).catch( (error) => {
                            res.send('Failed in adding');
                            res.status(200);
                        })
                }
            }).catch( (error) =>{
                res.send('Failed in adding');
                res.status(200);
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
        }).exec()
        .then ( (response) => {
                res.send('Updated successfully');
                res.status(200);
        }).catch(error => {
                res.send('Not found');
                res.status(200);
        })
    },
    delete: function(req, res){
        let id = req.query.id;
        productModel.findByIdAndRemove(id)
            .exec()
            .then( response => {
                res.send('Deleted successfully');
                res.status(200);
            }).catch( error => {
                res.send('failed in deleting');
                res.status(200);
            })
    }
}

module.exports = dbProductCtrl;