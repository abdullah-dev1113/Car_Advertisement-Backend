const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    "name" : {
        "type": mongoose.SchemaTypes.String
    },
    "email": {
        "type": mongoose.SchemaTypes.String,
        "required": true
    },
    "password": {
        "type": mongoose.SchemaTypes.String,
        "required": true
    },
    "contact": [{
        "type": mongoose.SchemaTypes.String,
    }],
    "birthDate" : {
        "type" : mongoose.SchemaTypes.String,
        "required" : true
    },
    "role": {
        "type": mongoose.SchemaTypes.ObjectId,
        "ref" : "Role",
        "required" : true
    },
    "image" : {
        "type" : mongoose.SchemaTypes.String
    },
    "address" :{
        "type" : mongoose.SchemaTypes.String,
    },
    "isVerified" : {
        type : mongoose.SchemaTypes.Boolean,
        default : false
    }
})

const User = mongoose.model("User", userschema);
module.exports = User;