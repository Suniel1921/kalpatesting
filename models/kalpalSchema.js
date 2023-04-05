const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    confPassword : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
    }
})

const kalpaData = mongoose.model('kalpauserData', userSchema);
module.exports = kalpaData;