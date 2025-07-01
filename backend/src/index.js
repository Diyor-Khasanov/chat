import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// 1. Load environment variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

// 3. Basic configuration
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// 4. Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-avpa.onrender.com",
    credentials: true,
  })
);

// 5. Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 6. Static files for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// 7. Start the server
server.listen(PORT, () => {
  console.log("🚀 Server is running on PORT: " + PORT);
});
