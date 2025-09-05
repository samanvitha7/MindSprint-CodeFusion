import mongoose from "mongoose";
import dotenv from "dotenv";
import Facility from "./models/facilityModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const facilities = [
  { id: 21, name: "Amsterdam Recycling", type: "recycling", lat: 52.3676, lng: 4.9041, country: "Netherlands", continent: "europe", address: "2100 Eco Avenue, Amsterdam", status: "Active", description: "Comprehensive recycling facility" },
  { id: 22, name: "Stockholm Hazardous Waste", type: "hazardous", lat: 59.3293, lng: 18.0686, country: "Sweden", continent: "europe", address: "2200 Chemical Road, Stockholm", status: "Active", description: "Industrial waste treatment" },
  { id: 23, name: "Vienna Waste Disposal", type: "waste", lat: 48.2082, lng: 16.3738, country: "Austria", continent: "europe", address: "2300 Disposal Street, Vienna", status: "Active", description: "Municipal waste collection" }
];

const seedDB = async () => {
  try {
    await Facility.insertMany(facilities);
    console.log("Facilities added!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

seedDB();
