const mongoose = require('mongoose');

const user = mongoose.model('users', {
    username: {type: String, unique: true, required: [true, 'username is required']},
    password: {type: String, required: true},
    mobileNo: {type: Number},
    lastUpdated: {type: Date, default: Date.now()},
    isActive: {type: Boolean, default: true}
})

module.exports = user;