import express from "express";
import Facility from "../models/facilityModel.js";

const router = express.Router();

// Fallback facility data (50 facilities across all 7 continents)
const fallbackFacilities = [
  // NORTH AMERICA (10 facilities)
  { id: 1, name: "NYC Hazardous Waste Facility", type: "hazardous", lat: 40.7128, lng: -74.0060, country: "USA", continent: "North America", address: "300 Hazardous Way, New York", status: "Active", description: "Handles chemicals, batteries, and electronic waste" },
  { id: 2, name: "Los Angeles Waste Disposal", type: "waste", lat: 34.0522, lng: -118.2437, country: "USA", continent: "North America", address: "2000 Disposal Road, Los Angeles", status: "Active", description: "Landfill and waste processing" },
  { id: 3, name: "Toronto Recycling Depot", type: "recycling", lat: 43.6532, lng: -79.3832, country: "Canada", continent: "North America", address: "1100 Green Road, Toronto", status: "Active", description: "Accepts all recyclable materials" },
  { id: 4, name: "Vancouver Green Center", type: "recycling", lat: 49.2827, lng: -123.1207, country: "Canada", continent: "North America", address: "2100 Eco Drive, Vancouver", status: "Active", description: "Advanced recycling and composting facility" },
  { id: 5, name: "Mexico City Recycling", type: "recycling", lat: 19.4326, lng: -99.1332, country: "Mexico", continent: "North America", address: "900 Recycle Blvd, Mexico City", status: "Active", description: "Community recycling center" },
  { id: 6, name: "Chicago Waste Management", type: "waste", lat: 41.8781, lng: -87.6298, country: "USA", continent: "North America", address: "2200 Industrial Ave, Chicago", status: "Active", description: "Municipal waste processing center" },
  { id: 7, name: "Miami Hazardous Disposal", type: "hazardous", lat: 25.7617, lng: -80.1918, country: "USA", continent: "North America", address: "2300 Chemical Way, Miami", status: "Active", description: "Specialized hazardous waste treatment" },
  { id: 8, name: "Montreal Eco Center", type: "recycling", lat: 45.5017, lng: -73.5673, country: "Canada", continent: "North America", address: "2400 Green St, Montreal", status: "Active", description: "Multi-material recovery facility" },
  { id: 9, name: "Guadalajara Waste Hub", type: "waste", lat: 20.6597, lng: -103.3496, country: "Mexico", continent: "North America", address: "2500 Waste Rd, Guadalajara", status: "Active", description: "Regional waste management center" },
  { id: 10, name: "Seattle Green Solutions", type: "recycling", lat: 47.6062, lng: -122.3321, country: "USA", continent: "North America", address: "2600 Sustainability Blvd, Seattle", status: "Active", description: "Zero-waste recycling facility" },

  // SOUTH AMERICA (8 facilities)
  { id: 11, name: "Sao Paulo Waste Disposal", type: "waste", lat: -23.5505, lng: -46.6333, country: "Brazil", continent: "South America", address: "1000 Disposal Way, Sao Paulo", status: "Active", description: "Landfill and waste-to-energy facility" },
  { id: 12, name: "Buenos Aires Hazardous Waste", type: "hazardous", lat: -34.6037, lng: -58.3816, country: "Argentina", continent: "South America", address: "1800 Chemical Avenue, Buenos Aires", status: "Active", description: "Industrial waste treatment facility" },
  { id: 13, name: "Rio de Janeiro Recycling", type: "recycling", lat: -22.9068, lng: -43.1729, country: "Brazil", continent: "South America", address: "2700 Beach Recycle, Rio de Janeiro", status: "Active", description: "Coastal waste management center" },
  { id: 14, name: "Lima Waste Center", type: "waste", lat: -12.0464, lng: -77.0428, country: "Peru", continent: "South America", address: "2800 Pacific Ave, Lima", status: "Active", description: "Municipal solid waste facility" },
  { id: 15, name: "Santiago Green Hub", type: "recycling", lat: -33.4489, lng: -70.6693, country: "Chile", continent: "South America", address: "2900 Andes Recycle, Santiago", status: "Active", description: "Mountain region recycling center" },
  { id: 16, name: "Bogota Hazardous Unit", type: "hazardous", lat: 4.7110, lng: -74.0721, country: "Colombia", continent: "South America", address: "3000 Highland Hazard, Bogota", status: "Active", description: "High-altitude waste treatment" },
  { id: 17, name: "Caracas Waste Solutions", type: "waste", lat: 10.4806, lng: -66.9036, country: "Venezuela", continent: "South America", address: "3100 Oil City Waste, Caracas", status: "Active", description: "Urban waste management hub" },
  { id: 18, name: "Montevideo Eco Point", type: "recycling", lat: -34.9011, lng: -56.1645, country: "Uruguay", continent: "South America", address: "3200 River Recycle, Montevideo", status: "Active", description: "River delta recycling facility" },

  // EUROPE (10 facilities)
  { id: 19, name: "London Recycling Centre", type: "recycling", lat: 51.5074, lng: -0.1278, country: "United Kingdom", continent: "Europe", address: "100 Recycling Way, London", status: "Active", description: "Accepts paper, plastic, glass, and metal" },
  { id: 20, name: "Paris Waste Disposal", type: "waste", lat: 48.8566, lng: 2.3522, country: "France", continent: "Europe", address: "200 Waste Management Rd, Paris", status: "Active", description: "General waste disposal facility" },
  { id: 21, name: "Berlin Recycling", type: "recycling", lat: 52.5200, lng: 13.4050, country: "Germany", continent: "Europe", address: "600 Green Avenue, Berlin", status: "Active", description: "Paper, plastic, and organic waste recycling" },
  { id: 22, name: "Rome Recycling Center", type: "recycling", lat: 41.9028, lng: 12.4964, country: "Italy", continent: "Europe", address: "1400 Eco Avenue, Rome", status: "Active", description: "Glass, paper, and plastic recycling" },
  { id: 23, name: "Madrid Waste Hub", type: "waste", lat: 40.4168, lng: -3.7038, country: "Spain", continent: "Europe", address: "3300 Castile Waste, Madrid", status: "Active", description: "Central Spain waste processing" },
  { id: 24, name: "Amsterdam Green Center", type: "recycling", lat: 52.3676, lng: 4.9041, country: "Netherlands", continent: "Europe", address: "3400 Canal Recycle, Amsterdam", status: "Active", description: "Innovative cycling-friendly recycling" },
  { id: 25, name: "Stockholm Eco Solutions", type: "recycling", lat: 59.3293, lng: 18.0686, country: "Sweden", continent: "Europe", address: "3500 Nordic Green, Stockholm", status: "Active", description: "Scandinavian sustainable waste management" },
  { id: 26, name: "Vienna Hazardous Center", type: "hazardous", lat: 48.2082, lng: 16.3738, country: "Austria", continent: "Europe", address: "3600 Alpine Hazard, Vienna", status: "Active", description: "Alpine region hazardous waste facility" },
  { id: 27, name: "Copenhagen Waste Solutions", type: "waste", lat: 55.6761, lng: 12.5683, country: "Denmark", continent: "Europe", address: "3700 Baltic Waste, Copenhagen", status: "Active", description: "Baltic Sea region waste management" },
  { id: 28, name: "Zurich Precision Recycling", type: "recycling", lat: 47.3769, lng: 8.5417, country: "Switzerland", continent: "Europe", address: "3800 Swiss Recycle, Zurich", status: "Active", description: "Precision Swiss recycling technology" },

  // ASIA (10 facilities)
  { id: 29, name: "Tokyo Recycling Center", type: "recycling", lat: 35.6762, lng: 139.6503, country: "Japan", continent: "Asia", address: "400 Eco Street, Tokyo", status: "Active", description: "Advanced sorting and recycling technology" },
  { id: 30, name: "Beijing Hazardous Waste", type: "hazardous", lat: 39.9042, lng: 116.4074, country: "China", continent: "Asia", address: "800 Chemical Rd, Beijing", status: "Active", description: "Industrial hazardous waste treatment" },
  { id: 31, name: "Seoul Waste Management", type: "waste", lat: 37.5665, lng: 126.9780, country: "South Korea", continent: "Asia", address: "1500 Disposal Road, Seoul", status: "Active", description: "Advanced waste processing facility" },
  { id: 32, name: "Mumbai Waste Facility", type: "waste", lat: 19.0760, lng: 72.8777, country: "India", continent: "Asia", address: "1200 Waste Lane, Mumbai", status: "Active", description: "Municipal solid waste management" },
  { id: 33, name: "Jakarta Recycling", type: "recycling", lat: -6.2088, lng: 106.8456, country: "Indonesia", continent: "Asia", address: "1600 Recycle Way, Jakarta", status: "Active", description: "Community recycling program" },
  { id: 34, name: "Shanghai Green Hub", type: "recycling", lat: 31.2304, lng: 121.4737, country: "China", continent: "Asia", address: "3900 Yangtze Recycle, Shanghai", status: "Active", description: "Yangtze River delta recycling center" },
  { id: 35, name: "Bangkok Waste Center", type: "waste", lat: 13.7563, lng: 100.5018, country: "Thailand", continent: "Asia", address: "4000 Mekong Waste, Bangkok", status: "Active", description: "Southeast Asian waste hub" },
  { id: 36, name: "Singapore Hazardous Unit", type: "hazardous", lat: 1.3521, lng: 103.8198, country: "Singapore", continent: "Asia", address: "4100 Island Hazard, Singapore", status: "Active", description: "Island nation specialized waste treatment" },
  { id: 37, name: "Osaka Recycling Solutions", type: "recycling", lat: 34.6937, lng: 135.5023, country: "Japan", continent: "Asia", address: "4200 Kansai Recycle, Osaka", status: "Active", description: "Kansai region recycling network" },
  { id: 38, name: "Delhi Waste Management", type: "waste", lat: 28.7041, lng: 77.1025, country: "India", continent: "Asia", address: "4300 Capital Waste, Delhi", status: "Active", description: "National capital waste processing" },

  // AFRICA (7 facilities)
  { id: 39, name: "Cape Town Recycling", type: "recycling", lat: -33.9249, lng: 18.4241, country: "South Africa", continent: "Africa", address: "1900 Green Street, Cape Town", status: "Active", description: "Paper and plastic recycling center" },
  { id: 40, name: "Cairo Hazardous Waste", type: "hazardous", lat: 30.0444, lng: 31.2357, country: "Egypt", continent: "Africa", address: "1300 Chemical Street, Cairo", status: "Active", description: "Medical and industrial waste treatment" },
  { id: 41, name: "Lagos Waste Hub", type: "waste", lat: 6.5244, lng: 3.3792, country: "Nigeria", continent: "Africa", address: "4400 Atlantic Waste, Lagos", status: "Active", description: "West African waste management center" },
  { id: 42, name: "Nairobi Green Center", type: "recycling", lat: -1.2921, lng: 36.8219, country: "Kenya", continent: "Africa", address: "4500 Safari Recycle, Nairobi", status: "Active", description: "East African recycling hub" },
  { id: 43, name: "Casablanca Eco Point", type: "recycling", lat: 33.5731, lng: -7.5898, country: "Morocco", continent: "Africa", address: "4600 Atlas Recycle, Casablanca", status: "Active", description: "North African coastal recycling" },
  { id: 44, name: "Johannesburg Waste Solutions", type: "waste", lat: -26.2041, lng: 28.0473, country: "South Africa", continent: "Africa", address: "4700 Gold City Waste, Johannesburg", status: "Active", description: "Mining region waste management" },
  { id: 45, name: "Addis Ababa Hazardous Center", type: "hazardous", lat: 9.1450, lng: 40.4897, country: "Ethiopia", continent: "Africa", address: "4800 Highland Hazard, Addis Ababa", status: "Active", description: "Ethiopian highlands hazardous waste" },

  // OCEANIA (3 facilities)
  { id: 46, name: "Sydney Waste Management", type: "waste", lat: -33.8688, lng: 151.2093, country: "Australia", continent: "Oceania", address: "500 Disposal Lane, Sydney", status: "Active", description: "Landfill and waste processing facility" },
  { id: 47, name: "Auckland Recycling Center", type: "recycling", lat: -36.8485, lng: 174.7633, country: "New Zealand", continent: "Oceania", address: "4900 Kiwi Recycle, Auckland", status: "Active", description: "South Pacific recycling facility" },
  { id: 48, name: "Perth Green Solutions", type: "recycling", lat: -31.9505, lng: 115.8605, country: "Australia", continent: "Oceania", address: "5000 Outback Recycle, Perth", status: "Active", description: "Western Australian recycling center" },

  // ANTARCTICA (2 facilities - Research stations)
  { id: 49, name: "McMurdo Research Waste", type: "hazardous", lat: -77.8419, lng: 166.6863, country: "Antarctica (USA)", continent: "Antarctica", address: "Research Station Alpha, McMurdo", status: "Active", description: "Antarctic research station waste management" },
  { id: 50, name: "Rothera Science Recycling", type: "recycling", lat: -67.5678, lng: -68.1271, country: "Antarctica (UK)", continent: "Antarctica", address: "Research Base Beta, Rothera", status: "Active", description: "Scientific waste recycling in Antarctica" }
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
