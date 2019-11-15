const jwt = require('jsonwebtoken');
const config = require('../config');
let basicAuthorization = {
    basicAuth: function (req, res, next) {
        try {
            if (req.headers['authorization']) {
                const credentials = req.headers['authorization'].replace("Basic", "");
                let decodedString = new Buffer(credentials, 'base64').toString();
                decodedString = decodedString.split(':');
                if (decodedString[0] === 'admin' && decodedString[1] === 'admin123') {
                    next();
                } else {
                    res.status(401);
                    res.send('Unauthorized User');
                }
            }else{
                res.status(400);
                res.send('Bad Request');
            }
        }catch(error){
            res.status(500);
            res.send('Internal server error');
        }
    },
    jwtAuth(req, res, next) {
        try {
            if (req.headers['authorization']) {
                const credentials = req.headers['authorization'];
                jwt.verify(credentials, config.JWTSecret, function(err, decoded) {   
                    if(err){
                        res.status(401);
                        res.send('Unauthorized User');
                    }else{
                        next();
                    }
                })
            }else{
                res.status(400);
                res.send('Bad Request');
            }
        }catch(error){
            res.status(500);
            res.send('Internal server error');
        }
    }
}
module.exports = basicAuthorization;