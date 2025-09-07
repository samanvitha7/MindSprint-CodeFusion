import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import your existing routes
import rulesRoutes from "./routes/rulesRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";

// ✅ New: Import contact route
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Debug: show the connection string (hide password)
const mongoUri = process.env.MONGO_URI;
console.log("🔑 Mongo URI (sanitized):", mongoUri.replace(/\/\/.*:.*@/, "//<user>:<password>@"));

// MongoDB connection with extra logs
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected successfully");
})
.catch(err => {
  console.error("❌ MongoDB connection error:");
  console.error("   Name:", err.name);
  console.error("   Message:", err.message);
  if (err.reason) console.error("   Reason:", err.reason);
});

// Routes
app.get("/", (req, res) => res.send("Backend is running"));

// Existing routes
app.use("/api/rules", rulesRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/model", modelRoutes);

// ✅ New Contact Form route


// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));
app.use("/api/contact", contactRoutes);


// Server start
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
