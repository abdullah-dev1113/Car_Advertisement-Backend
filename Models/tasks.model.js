const mongoose = require("mongoose");
const status = require("../controllers/status.controller");
const priority = require("../controllers/Priority.controller");
const Statuses = require("./Statuses.model");
const Pirority = require("./Priority.model");

const taskSchema = new mongoose.Schema({
    "Title": {
        "type": mongoose.SchemaTypes.String,
        'required': true
    },
    "Description" : {
        "type" : mongoose.SchemaTypes.String
    },
    "Price" : {
        "type" : mongoose.SchemaTypes.Number
    },
    "Features": {
    "type": [String], // now an array of strings
    "default": []
},

    "StartsOn": {
    "type": mongoose.SchemaTypes.Date,
    "default": Date.now
},
    "EndsOn" : {
        "type" : mongoose.SchemaTypes.Date
    },
    "Category" : {
        "type" : mongoose.SchemaTypes.String
    },
    "cityArea":{
        "type" : mongoose.SchemaTypes.String
    },
    "image":{
        "type" : mongoose.SchemaTypes.String
    },
    "Status": {
        "type": mongoose.SchemaTypes.ObjectId,
        "ref": 'Statuses'
    },
    "Priority": {
        "type": mongoose.SchemaTypes.ObjectId,
        "ref": 'Pirority'
    },
    "Progress": {
        "type": mongoose.SchemaTypes.Number
    },
    "CreatedBy": {
        "type": mongoose.SchemaTypes.ObjectId,
        "ref": "User",
    },
    "createdOn" : {
        "type" : mongoose.SchemaTypes.Date,
        "default":Date.now
    },
    
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;