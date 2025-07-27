console.log("Starting server...");

const express = require("express");
const app = express();
const cors = require("cors"); // ✅ Keep only this one
const path = require("path");
const connectDB = require("./db");
const itemsRoute = require("./routes/items");
const orderRoutes = require('./routes/orders');
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/items", itemsRoute);
app.use("/api/orders", orderRoutes);

// Connect DB and start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
