const productModel = require('../models/product.model');
const productsvc = require('../services/products.svc');
const reviewsSvc = require('../services/reviews.svc');
const dbProductCtrl = {
    getProducts: async function (req, res) {
        try {
            let products = await productsvc.getProducts();
            res.json(products);
            res.status(200);
        } catch (error) {
            res.send('failed to fetch products');
            res.status(400);
        }
    },
    getProductsByIndex: async function (req, res) {
        try {
            let cnt = await productsvc.getProductsCount();
            let pageIndex = +req.params.pageIndex || 0;
            let pageSize = +req.params.pageSize || 10;
            let totalPages = Math.ceil(cnt / pageSize);
            let metadata = {
                count: cnt,
                totalPages: totalPages,
                hasPrevious: pageIndex > 0,
                hasNext: pageIndex < totalPages - 1
            };
            let productsToSkip = Math.ceil(pageIndex * pageSize);
            let response = await productsvc.getProductsUsingLimit(productsToSkip, pageSize);
            let jsonResponse = response;
            for(let i = 0; i < jsonResponse.length; i++){
                if(jsonResponse[i].image) jsonResponse[i].image = `${req.protocol}://${req.get('host')}/${jsonResponse[i].image}`;
                else jsonResponse.image = '';
            }
            res.json({ metadata: metadata, data: jsonResponse });
            res.status(200);
        } catch (error) {
            res.send(error);
            res.status(200);
        }
    },
    getProductByID: async function (req, res) {
        try {
            let jsonProduct;
            let id = req.params.id;
            let product = await productsvc.getProductByID(id);
            jsonProduct = product.toJSON();
            jsonProduct.image = `${req.protocol}://${req.get('host')}/${product.image}`;
            let reviews = reviewsSvc.getReviews(id);
            jsonProduct.reviews = reviews;
            res.send(jsonProduct);
            res.status(200);
        }
        catch(error){
            res.send(error);
            res.status(200);
        }
        
    },
    addProduct: async function (req, res) {
        try{
            let product = await productsvc.getProductByParameter(req.body.name);
            if(product){
                res.send('already exist').status(200);
            }else{
                await productsvc.addProduct(req.body);
                res.send('Inserted successfully');
                res.status(200);
            }
        }catch(err){
            res.send(error);
            res.status(200);
        }
    },
    update: async function (req, res) {
        try{    
            let id = req.body._id;
            await productsvc.updateProduct(id, req.body);
            res.send('Updated successfully');
            res.status(200);
        }catch(err){
            res.send(err).status(200);
        }
    },
    delete: async function (req, res) {
        try{
            let id = req.query.id;
            await productsvc.deleteProduct(id);
            res.send('Deleted successfully');
            res.status(200);
        }catch(error) {
            res.send('failed in deleting');
            res.status(200);
        }
    }
}

module.exports = dbProductCtrl;