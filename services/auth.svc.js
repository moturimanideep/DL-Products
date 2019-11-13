const userModel = require('../models/user.model');

const userService = {
    getUser: function(username){
        return userModel.findOne({username: username})
                .exec();
    },
    addUser: function(data){
        let user = new userModel(data);
        return user.save();
    }
}

module.exports = userService;