const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDB = require("./DataBase/ConnectMongoDB");

dotenv.config();
const app = express();

// CORS Configuration
app.use(cors({
    origin: ['https://myai-portfolio.vercel.app','http://localhost:3000', 'https://career-craft-ai.vercel.app', 'http://localhost:5173', 'https://ai-career-pilot.vercel.app'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
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

// Routes
const UserRouter = require("./routes/User")
app.use('/user', UserRouter);

// Default Route with DB Connection Status
app.get("/", async (req, res) => {
    try {
        await connectMongoDB();
        res.send("🚀 Welcome to Career Craft AI Backend - MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        res.status(500).send("🚀 Welcome to Career Craft AI Backend - MongoDB Connection Error");
    }
});

// Connect to MongoDB first, then define the port
connectMongoDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        
        // Only start server in non-serverless environments
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
        }
    })
    .catch((error) => {
        console.error("❌ Initial MongoDB Connection Failed:", error);
        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    });

// Export for serverless use
module.exports = app;
