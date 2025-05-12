const mongoose = require('mongoose');
require("dotenv").config();

// Create a cached connection variable
let cachedConnection = null;

async function connectMongoDB() {
    // If the connection exists, use it
    if (cachedConnection) {
        console.log("✅ Using cached MongoDB connection");
        return cachedConnection;
    }
    
    try {
        mongoose.set('strictQuery', false);
        
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB URI is missing. Please check your environment variables.");
        }
        
        // Add serverless-friendly options
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        };
        
        const connection = await mongoose.connect(process.env.MONGO_URI, options);
        cachedConnection = connection;
        console.log("✅ Connected to MongoDB");
        return connection;
    } catch (err) {
        console.error("❌ Connection to MongoDB Failed:", err);
        throw err;
    }
}

module.exports = connectMongoDB;
