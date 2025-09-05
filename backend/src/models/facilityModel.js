import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["recycling", "hazardous", "waste"], required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  country: { type: String, required: true },
  continent: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  description: { type: String }
});

const Facility = mongoose.model("Facility", facilitySchema);

export default Facility;
