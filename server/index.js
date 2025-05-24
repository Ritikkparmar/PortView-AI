const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDB = require("./DataBase/ConnectMongoDB");

dotenv.config();
const app = express();

// CORS Configuration
app.use(cors({
    origin: ['https://myai-portfolio.vercel.app', 'http://localhost:3000', 'https://career-craft-ai.vercel.app', 'http://localhost:5173', 'https://ai-career-pilot.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Middleware
app.use(express.json());

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Routes
const UserRouter = require("./routes/User");
app.use('/user', UserRouter);

// Default Route with DB Connection Status
app.get("/", async (req, res) => {
    try {
        await connectMongoDB();
        res.json({
            status: "success",
            message: "🚀 Welcome to Career Craft AI Backend - MongoDB Connected"
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        res.status(500).json({
            status: "error",
            message: "MongoDB Connection Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Initialize MongoDB connection
let isConnected = false;

const initializeApp = async () => {
    try {
        await connectMongoDB();
        isConnected = true;
        console.log("✅ MongoDB Connected Successfully");
        
        if (process.env.NODE_ENV !== 'production') {
            const PORT = process.env.PORT || 5000;
            app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
        }
    } catch (error) {
        console.error("❌ Failed to initialize app:", error);
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

initializeApp();

// Export for serverless use
module.exports = app;
