let products = [
    {
        id: 1001,
        name: 'Samsung S9 Plus',
        price: '39999',
        inStock: true
    },
    {
        id: 1002,
        name: 'One Plus 7',
        price: '39999',
        inStock: true
    },
    {
        id: 1003,
        name: 'One Plus 6',
        price: '29999',
        inStock: false
    },
];
const productCtrl = {
    getProducts: function(req, res){
        res.json(products);
        res.status(200);
    },
    getProductByID: function(req, res){
        let id = +req.params.id;
        let product;
        for(let i = 0; i < products.length; i++){
            if(products[i].id === id){
                product = products[i];
            }
        }
        if(product){
            res.send(product);
            res.status(200);
        }else{
            res.send('Not found');
            res.status(404);
        }
    },
    addProduct: function(req, res){
        let id = req.body.id;
        let isPresent = false;
        for(let i = 0; i < products.length; i++){
            if(products[i].id === id){
                isPresent = true;
            }
        }
        if(isPresent){
            res.send('Already exist');
            res.status(200);
        }else{
            products.push(req.body);
            res.send('Inserted successfully');
            res.status(200);
        }
    }
}

module.exports = productCtrl;