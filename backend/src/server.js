import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Example User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  waterLogs: [{ date: String, glasses: Number }]
});
const User = mongoose.model("User", userSchema);

// Example POST route
app.post("/log-water", async (req, res) => {
  const { email, date, glasses } = req.body;
  let user = await User.findOne({ email });
  if (!user) user = new User({ email, waterLogs: [] });
  user.waterLogs.push({ date, glasses });
  await user.save();
  res.json({ message: "Log saved!", user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
