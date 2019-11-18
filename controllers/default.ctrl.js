var defaultCtrl = {
    defaultCheck: function(req, res){
        res.send('Welcome to DL products');
        res.status(200);
    },
    healthCheck: function(req, res){
        res.send({status: 'Dl-Products is up on runing'});
        res.status(200);
    },
    home: function(req, res){
        res.render('home', {layout: 'default', template: 'home-template'});
    }
}

module.exports = defaultCtrl;