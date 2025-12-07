const mongoose = require("mongoose");

const roleschema = new mongoose.Schema({
    "Name": {
        "type": mongoose.SchemaTypes.String
    },
    "rank": {
        "type": mongoose.SchemaTypes.Number
    }
})

const Role = mongoose.model("Role", roleschema);

module.exports = Role;