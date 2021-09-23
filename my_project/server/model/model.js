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
    date : Date,
    description : String,
});

const UserDb = mongoose.model('userDb', schema);

module.exports = UserDb;