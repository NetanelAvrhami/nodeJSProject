const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    cost : {
        type : String,
        required: true
    },
    category : {
        type: String,
        required: true,
    },
    description : String,
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;