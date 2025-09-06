import express from "express";
import Facility from "../models/facilityModel.js";

const router = express.Router();

// Fallback facility data (in case database is not available)
const fallbackFacilities = [
  { id: 1, name: "London Recycling Centre", type: "recycling", lat: 51.5074, lng: -0.1278, country: "United Kingdom", continent: "Europe", address: "100 Recycling Way, London", status: "Active", description: "Accepts paper, plastic, glass, and metal" },
  { id: 2, name: "Paris Waste Disposal", type: "waste", lat: 48.8566, lng: 2.3522, country: "France", continent: "Europe", address: "200 Waste Management Rd, Paris", status: "Active", description: "General waste disposal facility" },
  { id: 3, name: "NYC Hazardous Waste Facility", type: "hazardous", lat: 40.7128, lng: -74.0060, country: "USA", continent: "North America", address: "300 Hazardous Way, New York", status: "Active", description: "Handles chemicals, batteries, and electronic waste" },
  { id: 4, name: "Tokyo Recycling Center", type: "recycling", lat: 35.6762, lng: 139.6503, country: "Japan", continent: "Asia", address: "400 Eco Street, Tokyo", status: "Active", description: "Advanced sorting and recycling technology" },
  { id: 5, name: "Sydney Waste Management", type: "waste", lat: -33.8688, lng: 151.2093, country: "Australia", continent: "Australia", address: "500 Disposal Lane, Sydney", status: "Active", description: "Landfill and waste processing facility" },
  { id: 6, name: "Berlin Recycling", type: "recycling", lat: 52.5200, lng: 13.4050, country: "Germany", continent: "Europe", address: "600 Green Avenue, Berlin", status: "Active", description: "Paper, plastic, and organic waste recycling" },
  { id: 7, name: "Moscow Waste Facility", type: "waste", lat: 55.7558, lng: 37.6173, country: "Russia", continent: "Europe", address: "700 Waste Street, Moscow", status: "Active", description: "Municipal waste collection and processing" },
  { id: 8, name: "Beijing Hazardous Waste", type: "hazardous", lat: 39.9042, lng: 116.4074, country: "China", continent: "Asia", address: "800 Chemical Rd, Beijing", status: "Active", description: "Industrial hazardous waste treatment" },
  { id: 9, name: "Mexico City Recycling", type: "recycling", lat: 19.4326, lng: -99.1332, country: "Mexico", continent: "North America", address: "900 Recycle Blvd, Mexico City", status: "Active", description: "Community recycling center" },
  { id: 10, name: "Sao Paulo Waste Disposal", type: "waste", lat: -23.5505, lng: -46.6333, country: "Brazil", continent: "South America", address: "1000 Disposal Way, Sao Paulo", status: "Active", description: "Landfill and waste-to-energy facility" },
  { id: 11, name: "Toronto Recycling Depot", type: "recycling", lat: 43.6532, lng: -79.3832, country: "Canada", continent: "North America", address: "1100 Green Road, Toronto", status: "Active", description: "Accepts all recyclable materials" },
  { id: 12, name: "Mumbai Waste Facility", type: "waste", lat: 19.0760, lng: 72.8777, country: "India", continent: "Asia", address: "1200 Waste Lane, Mumbai", status: "Active", description: "Municipal solid waste management" },
  { id: 13, name: "Cairo Hazardous Waste", type: "hazardous", lat: 30.0444, lng: 31.2357, country: "Egypt", continent: "Africa", address: "1300 Chemical Street, Cairo", status: "Active", description: "Medical and industrial waste treatment" },
  { id: 14, name: "Rome Recycling Center", type: "recycling", lat: 41.9028, lng: 12.4964, country: "Italy", continent: "Europe", address: "1400 Eco Avenue, Rome", status: "Active", description: "Glass, paper, and plastic recycling" },
  { id: 15, name: "Seoul Waste Management", type: "waste", lat: 37.5665, lng: 126.9780, country: "South Korea", continent: "Asia", address: "1500 Disposal Road, Seoul", status: "Active", description: "Advanced waste processing facility" },
  { id: 16, name: "Jakarta Recycling", type: "recycling", lat: -6.2088, lng: 106.8456, country: "Indonesia", continent: "Asia", address: "1600 Recycle Way, Jakarta", status: "Active", description: "Community recycling program" },
  { id: 17, name: "Istanbul Waste Facility", type: "waste", lat: 41.0082, lng: 28.9784, country: "Turkey", continent: "Europe", address: "1700 Waste Street, Istanbul", status: "Active", description: "Municipal waste collection center" },
  { id: 18, name: "Buenos Aires Hazardous Waste", type: "hazardous", lat: -34.6037, lng: -58.3816, country: "Argentina", continent: "South America", address: "1800 Chemical Avenue, Buenos Aires", status: "Active", description: "Industrial waste treatment facility" },
  { id: 19, name: "Cape Town Recycling", type: "recycling", lat: -33.9249, lng: 18.4241, country: "South Africa", continent: "Africa", address: "1900 Green Street, Cape Town", status: "Active", description: "Paper and plastic recycling center" },
  { id: 20, name: "Los Angeles Waste Disposal", type: "waste", lat: 34.0522, lng: -118.2437, country: "USA", continent: "North America", address: "2000 Disposal Road, Los Angeles", status: "Active", description: "Landfill and waste processing" }
];

// Get all facilities
router.get("/", async (req, res) => {
  try {
    // Try to fetch from database first
    const facilities = await Facility.find({});
    
    // If database has data, return it
    if (facilities && facilities.length > 0) {
      console.log(`✅ Fetched ${facilities.length} facilities from database`);
      res.status(200).json(facilities);
    } else {
      // If no data in database, return fallback data
      console.log(`⚠️  Database empty, using fallback data (${fallbackFacilities.length} facilities)`);
      res.status(200).json(fallbackFacilities);
    }
  } catch (error) {
    // If database connection fails, return fallback data
    console.error('Database error, using fallback data:', error.message);
    res.status(200).json(fallbackFacilities);
  }
});

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
