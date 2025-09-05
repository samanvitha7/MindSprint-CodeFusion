import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rulesRoutes from "./routes/rulesRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => res.send("Backend is running"));
app.use("/api/rules", rulesRoutes);
app.use("/api/facilities", facilityRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

