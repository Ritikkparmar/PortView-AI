const mongoose = require('mongoose');
require("dotenv").config();

async function connectMongoDB() {
    try {
        mongoose.set('strictQuery', false); // Optional, depends on your schema strictness
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Connection to MongoDB Failed:", err);
        throw err;
    }
}

module.exports = connectMongoDB;
