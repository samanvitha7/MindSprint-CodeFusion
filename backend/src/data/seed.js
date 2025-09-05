import mongoose from "mongoose";
import dotenv from "dotenv";
import Facility from "./models/facilityModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const facilities = [
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
  { id: 20, name: "Los Angeles Waste Disposal", type: "waste", lat: 34.0522, lng: -118.2437, country: "USA", continent: "North America", address: "2000 Disposal Road, Los Angeles", status: "Active", description: "Landfill and waste processing" },
  { id: 21, name: "Madrid Recycling Center", type: "recycling", lat: 40.4168, lng: -3.7038, country: "Spain", continent: "Europe", address: "2100 Eco Avenue, Madrid", status: "Active", description: "Comprehensive recycling facility" },
  { id: 22, name: "Lagos Waste Management", type: "waste", lat: 6.5244, lng: 3.3792, country: "Nigeria", continent: "Africa", address: "2200 Waste Way, Lagos", status: "Active", description: "Municipal solid waste collection" },
  { id: 23, name: "Bangkok Hazardous Waste", type: "hazardous", lat: 13.7563, lng: 100.5018, country: "Thailand", continent: "Asia", address: "2300 Chemical Road, Bangkok", status: "Active", description: "Industrial and electronic waste treatment" },
  { id: 24, name: "Berlin Recycling", type: "recycling", lat: 52.5200, lng: 13.4050, country: "Germany", continent: "Europe", address: "2400 Green Blvd, Berlin", status: "Active", description: "Advanced recycling technology" },
  { id: 25, name: "Moscow Waste Facility", type: "waste", lat: 55.7558, lng: 37.6173, country: "Russia", continent: "Europe", address: "2500 Waste Street, Moscow", status: "Active", description: "Municipal waste processing" },
  { id: 26, name: "Tokyo Hazardous Waste", type: "hazardous", lat: 35.6762, lng: 139.6503, country: "Japan", continent: "Asia", address: "2600 Chemical Way, Tokyo", status: "Active", description: "Advanced hazardous waste treatment" },
  { id: 27, name: "London E-Waste Recycling", type: "recycling", lat: 51.5074, lng: -0.1278, country: "United Kingdom", continent: "Europe", address: "2700 Electronic Recycling, London", status: "Active", description: "Specializes in electronic waste recycling" },
  { id: 28, name: "New York Organic Recycling", type: "recycling", lat: 40.7128, lng: -74.0060, country: "USA", continent: "North America", address: "2800 Compost Way, New York", status: "Active", description: "Food and organic waste composting" },
  { id: 29, name: "Paris Hazardous Waste", type: "hazardous", lat: 48.8566, lng: 2.3522, country: "France", continent: "Europe", address: "2900 Chemical Street, Paris", status: "Active", description: "Industrial chemical waste treatment" },
  { id: 30, name: "Sydney Recycling", type: "recycling", lat: -33.8688, lng: 151.2093, country: "Australia", continent: "Australia", address: "3000 Green Avenue, Sydney", status: "Active", description: "Community recycling center" },
  { id: 31, name: "Rio de Janeiro Waste", type: "waste", lat: -22.9068, lng: -43.1729, country: "Brazil", continent: "South America", address: "3100 Waste Road, Rio de Janeiro", status: "Active", description: "Municipal waste collection" },
  { id: 32, name: "Beijing Recycling", type: "recycling", lat: 39.9042, lng: 116.4074, country: "China", continent: "Asia", address: "3200 Recycle Blvd, Beijing", status: "Active", description: "Plastic and paper recycling" },
  { id: 33, name: "Cairo Waste Management", type: "waste", lat: 30.0444, lng: 31.2357, country: "Egypt", continent: "Africa", address: "3300 Disposal Street, Cairo", status: "Active", description: "Municipal solid waste processing" },
  { id: 34, name: "Delhi Hazardous Waste", type: "hazardous", lat: 28.7041, lng: 77.1025, country: "India", continent: "Asia", address: "3400 Chemical Road, Delhi", status: "Active", description: "Industrial waste treatment facility" },
  { id: 35, name: "Toronto Waste Disposal", type: "waste", lat: 43.6532, lng: -79.3832, country: "Canada", continent: "North America", address: "3500 Waste Way, Toronto", status: "Active", description: "Landfill and waste management" },
  { id: 36, name: "Seoul Recycling", type: "recycling", lat: 37.5665, lng: 126.9780, country: "South Korea", continent: "Asia", address: "3600 Green Street, Seoul", status: "Active", description: "Advanced recycling technology" },
  { id: 37, name: "Mexico City Hazardous Waste", type: "hazardous", lat: 19.4326, lng: -99.1332, country: "Mexico", continent: "North America", address: "3700 Chemical Avenue, Mexico City", status: "Active", description: "Industrial chemical treatment" },
  { id: 38, name: "Istanbul Recycling", type: "recycling", lat: 41.0082, lng: 28.9784, country: "Turkey", continent: "Europe", address: "3800 Recycle Road, Istanbul", status: "Active", description: "Community recycling program" },
  { id: 39, name: "Jakarta Waste Management", type: "waste", lat: -6.2088, lng: 106.8456, country: "Indonesia", continent: "Asia", address: "3900 Disposal Way, Jakarta", status: "Active", description: "Municipal waste collection" },
  { id: 40, name: "Buenos Aires Recycling", type: "recycling", lat: -34.6037, lng: -58.3816, country: "Argentina", continent: "South America", address: "4000 Green Blvd, Buenos Aires", status: "Active", description: "Paper and plastic recycling" },
  { id: 41, name: "Cape Town Hazardous Waste", type: "hazardous", lat: -33.9249, lng: 18.4241, country: "South Africa", continent: "Africa", address: "4100 Chemical Street, Cape Town", status: "Active", description: "Medical and industrial waste treatment" },
  { id: 42, name: "Los Angeles Recycling", type: "recycling", lat: 34.0522, lng: -118.2437, country: "USA", continent: "North America", address: "4200 Recycle Way, Los Angeles", status: "Active", description: "Comprehensive recycling center" },
  { id: 43, name: "Madrid Waste Management", type: "waste", lat: 40.4168, lng: -3.7038, country: "Spain", continent: "Europe", address: "4300 Waste Road, Madrid", status: "Active", description: "Municipal waste processing" },
  { id: 44, name: "Lagos Recycling", type: "recycling", lat: 6.5244, lng: 3.3792, country: "Nigeria", continent: "Africa", address: "4400 Green Avenue, Lagos", status: "Active", description: "Community recycling initiative" },
  { id: 45, name: "Bangkok Waste Disposal", type: "waste", lat: 13.7563, lng: 100.5018, country: "Thailand", continent: "Asia", address: "4500 Disposal Street, Bangkok", status: "Active", description: "Municipal solid waste management" },
  { id: 46, name: "Chicago Hazardous Waste", type: "hazardous", lat: 41.8781, lng: -87.6298, country: "USA", continent: "North America", address: "4600 Chemical Road, Chicago", status: "Active", description: "Industrial waste treatment facility" },
  { id: 47, name: "Mumbai Recycling", type: "recycling", lat: 19.0760, lng: 72.8777, country: "India", continent: "Asia", address: "4700 Recycle Blvd, Mumbai", status: "Active", description: "Plastic and paper recycling" },
  { id: 48, name: "Rome Hazardous Waste", type: "hazardous", lat: 41.9028, lng: 12.4964, country: "Italy", continent: "Europe", address: "4800 Chemical Way, Rome", status: "Active", description: "Industrial chemical treatment" },
  { id: 49, name: "Shanghai Waste Management", type: "waste", lat: 31.2304, lng: 121.4737, country: "China", continent: "Asia", address: "4900 Waste Street, Shanghai", status: "Active", description: "Municipal waste processing" },
  { id: 50, name: "Berlin Hazardous Waste", type: "hazardous", lat: 52.5200, lng: 13.4050, country: "Germany", continent: "Europe", address: "5000 Chemical Avenue, Berlin", status: "Active", description: "Advanced hazardous waste treatment" }
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
