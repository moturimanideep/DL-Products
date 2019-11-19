const productModel = require('../models/product.model');

class ProductService {
    getProducts(){
        return productModel.find({}).exec();
    }
    getProductsCount(){
        return productModel.countDocuments().exec();
    }
    getProductsUsingLimit(productsToSkip, pageSize){
        return productModel.find()
        .skip(productsToSkip)
        .limit(pageSize)
        .exec()
    }
    getProductByID(id){
        return productModel.findById(id)
        .exec();
    }
    getProductByParameter(name){
        return productModel.findOne({ name: name })
        .exec();
    }
    addProduct(data){
        let product = new productModel(data);
        return product.save();
    }
    updateProduct(id, data){
        return productModel.findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                price: data.price,
                inStock: data.inStock
            }
        }).exec()
    }
    deleteProduct(id){
        return productModel.findByIdAndRemove(id)
        .exec()
    }
}

module.exports = new ProductService();