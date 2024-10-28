const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    emailaddr: {
        type: String,
        required: true,
        //unique: true
    },  
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('user', userSchema);
