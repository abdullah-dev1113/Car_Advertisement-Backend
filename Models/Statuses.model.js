const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    icon: {
        type: mongoose.SchemaTypes.String
    },
    color: {
        type: mongoose.SchemaTypes.String
    }
});

const Statuses = mongoose.model("Statuses", StatusSchema);

module.exports = Statuses;