import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons for different facility types
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const icons = {
  recycling: createCustomIcon("green"),
  waste: createCustomIcon("blue"),
  hazardous: createCustomIcon("red"),
};

const Map = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [filters, setFilters] = useState({
    recycling: true,
    waste: true,
    hazardous: true,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch facilities from backend
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/facilities");
        if (!response.ok) {
          throw new Error("Failed to fetch facilities");
        }
        const data = await response.json();
        console.log("✅ Fetched facilities:", data.length);
        setFacilities(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  // Filter facilities based on type filters and search query
  useEffect(() => {
    let filtered = facilities.filter((facility) => {
      const matchesFilter = filters[facility.type];
      const matchesSearch =
        searchQuery === "" ||
        facility.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.type?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
    setFilteredFacilities(filtered);
  }, [facilities, filters, searchQuery]);

  // Handle filter changes
  const handleFilterChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      recycling: true,
      waste: true,
      hazardous: true,
    });
    setSearchQuery("");
  };

  // Calculate statistics
  const stats = {
    total: facilities.length,
    recycling: facilities.filter((f) => f.type === "recycling").length,
    waste: facilities.filter((f) => f.type === "waste").length,
    hazardous: facilities.filter((f) => f.type === "hazardous").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading facilities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="text-xl font-semibold mb-2">Error Loading Map</h2>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Please ensure the backend server is running on port 5000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="mr-2">🌍</span>
            Global Waste Facility Map
          </h1>
          <p className="text-gray-600 text-sm">
            Real-time data with {facilities.length} facilities worldwide
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <h3 className="text-2xl font-bold text-green-600">{stats.total}</h3>
            <p className="text-xs text-gray-600">Total Facilities</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <h3 className="text-2xl font-bold text-green-500">
              {stats.recycling}
            </h3>
            <p className="text-xs text-gray-600">Recycling Centers</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <h3 className="text-2xl font-bold text-blue-600">{stats.waste}</h3>
            <p className="text-xs text-gray-600">Waste Disposal</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <h3 className="text-2xl font-bold text-red-600">
              {stats.hazardous}
            </h3>
            <p className="text-xs text-gray-600">Hazardous Waste</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search facilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Filter Facilities
            </h3>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-green-600 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="space-y-3">
            {["recycling", "waste", "hazardous"].map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[type]}
                  onChange={() => handleFilterChange(type)}
                  className="mr-3 rounded text-green-600 focus:ring-green-500"
                />
                <div
                  className={`w-4 h-4 rounded-full mr-2 ${
                    type === "recycling"
                      ? "bg-green-500"
                      : type === "waste"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="text-gray-700 capitalize">
                  {type} Centers
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[30, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredFacilities.map((facility) => {
            if (
              facility.lat == null ||
              facility.lng == null ||
              isNaN(facility.lat) ||
              isNaN(facility.lng)
            ) {
              console.error("⚠️ Skipping invalid facility:", facility);
              return null;
            }
            const icon = icons[facility.type] || icons.recycling;

            return (
              <Marker
                key={facility._id || facility.id}
                position={[facility.lat, facility.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="p-2 min-w-64">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {facility.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Type:</strong>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            facility.type === "recycling"
                              ? "bg-green-100 text-green-800"
                              : facility.type === "waste"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {facility.type}
                        </span>
                      </p>
                      <p>
                        <strong>Address:</strong> {facility.address}
                      </p>
                      <p>
                        <strong>Country:</strong> {facility.country}
                      </p>
                      <p>
                        <strong>Continent:</strong> {facility.continent}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            facility.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {facility.status}
                        </span>
                      </p>
                      {facility.description && (
                        <p>
                          <strong>Description:</strong> {facility.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg border z-[1000]">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            Facility Types
          </h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Recycling</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Waste Disposal</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Hazardous Waste</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
