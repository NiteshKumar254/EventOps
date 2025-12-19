
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Correct CORS setup
app.use(cors({
  origin: [
    process.env.CLIENT_URL,      // production
    "http://localhost:5173"      // development
  ],
  credentials: true,
}));
app.options(/(.*)/, cors());

// Middleware setup
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/attendance", attendanceRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("QR Event Management API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
