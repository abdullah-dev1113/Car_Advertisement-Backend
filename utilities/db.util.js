require("dotenv").config();
const mongoose = require("mongoose");

async function ConnectDb() {
    await mongoose.connect(process.env.DB_URI);
}

module.exports = ConnectDb;