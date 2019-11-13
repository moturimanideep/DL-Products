const authSvc = require('../services/auth.svc');
const bcrypt = require('bcrypt');
const authCtrl = {
    register: async function(request, response){
        try{
            request.body.password = bcrypt.hashSync(request.body.password, 2);
            let res = await authSvc.addUser(request.body);
            if(res){
                response.status(200).send({status: 1, data: 'Registered successfully'});
            }
        }catch(error){
            if(error && error.errmsg && error.errmsg.includes('duplicate key error collection') > -1){
                response.status(200).send({status: 0, data: 'Already exist'});
            }else{
                response.status(500).send('Internal server error');
            }
        }

    },
    login: async function(req, res){
        try{
            let user = await authSvc.getUser(req.body.username);
            let credCheck = bcrypt.compareSync(req.body.password, user.password);
            if(credCheck){
                res.status(200).json({status: 1, data: user});
            }else{
                res.status(200).send({status: 0, data: 'Invalid username/password'});
            }
        }catch(error){  
            res.status(500).send(error);
        }
    }
}

module.exports = authCtrl;