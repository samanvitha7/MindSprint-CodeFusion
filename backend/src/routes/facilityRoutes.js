import express from "express";
import Facility from "../models/facilityModel.js";

const router = express.Router();

// Insert multiple facilities
router.post("/add", async (req, res) => {
  try {
    const facilities = req.body; 
    const result = await Facility.insertMany(facilities, { ordered: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add facilities", error });
  }
});

export default router;
