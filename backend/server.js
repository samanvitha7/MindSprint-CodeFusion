require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
