const mongoose = require("mongoose");

const PrioritySchema = new mongoose.Schema({
    "name": {
        "type": mongoose.SchemaTypes.String,
        "required": true,
    },
    "icon": {
        "type": mongoose.SchemaTypes.String
    },
    "color": {
        "type": mongoose.SchemaTypes.String
    }
});

const Pirority = mongoose.model("Pirority", PrioritySchema);

module.exports = Pirority;
