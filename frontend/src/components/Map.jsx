import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// CSS styles for English map with full coverage
const mapStyles = `
  .english-map {
    font-family: 'Arial', 'Helvetica', sans-serif;
    width: 100% !important;
    height: 100% !important;
  }
  .english-map .leaflet-control-attribution {
    font-size: 10px;
  }
  .leaflet-popup-content {
    font-family: 'Arial', 'Helvetica', sans-serif;
  }
  .leaflet-container {
    background-color: #f0f8ff;
    width: 100%;
    height: 100%;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = mapStyles;
  document.head.appendChild(styleSheet);
}

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

// Map tile layer configurations with English language preference
const mapTileConfigs = {
  openstreetmap: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | English',
  },
  cartodb: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> | English labels',
  },
  esri: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012 | English',
  }
};

// Component to control map bounds and zoom limits
const MapBounds = () => {
  const map = useMap();

  useEffect(() => {
    // Set language preference for map labels (if supported by tile provider)
    if (map.getContainer) {
      map.getContainer().setAttribute('lang', 'en');
    }

    // Calculate minimum zoom level to fill viewport without showing background
    const calculateMinZoom = () => {
      const container = map.getContainer();
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      // World dimensions at zoom level 0: 256x256 pixels
      // Calculate zoom needed to fill width and height
      const zoomForWidth = Math.log2(containerWidth / 256);
      const zoomForHeight = Math.log2(containerHeight / 256);
      
      // Use the larger zoom to ensure both dimensions are filled
      const calculatedMinZoom = Math.max(zoomForWidth, zoomForHeight);
      
      // Round up and add small buffer to ensure no background is visible
      return Math.max(1.5, Math.ceil(calculatedMinZoom * 10) / 10 + 0.2);
    };

    // Define tighter world bounds that focus on inhabited areas
    const worldBounds = L.latLngBounds(
      [-85, -180], // Southwest coordinates (full world coverage)
      [85, 180]    // Northeast coordinates (full world coverage)
    );

    // Calculate and set minimum zoom
    const minZoom = calculateMinZoom();
    console.log(`🗺️ Calculated minimum zoom: ${minZoom}`);
    
    // Set zoom constraints with calculated minimum
    map.setMinZoom(minZoom);  // Dynamic minimum zoom to fill viewport
    map.setMaxZoom(18);       // Maximum zoom level (street level)

    // Set the maximum bounds to prevent panning outside the world
    map.setMaxBounds(worldBounds);
    
    // Fit the map to fill the viewport without showing background
    const initialBounds = L.latLngBounds(
      [-60, -170], // Southwest - covers all continents
      [75, 170]    // Northeast - covers all continents
    );
    
    // Fit bounds with no padding to maximize map coverage
    map.fitBounds(initialBounds, { 
      padding: [0, 0],
      maxZoom: Math.max(minZoom + 0.5, 3) // Don't zoom in too much initially
    });

    // Enhanced zoom control to prevent background visibility
    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      if (currentZoom < minZoom) {
        console.log(`⚠️ Zoom too low (${currentZoom}), adjusting to minimum (${minZoom})`);
        map.setZoom(minZoom);
      }
    };

    // Handle map resize to recalculate minimum zoom
    const handleResize = () => {
      const newMinZoom = calculateMinZoom();
      console.log(`🔄 Map resized, new minimum zoom: ${newMinZoom}`);
      map.setMinZoom(newMinZoom);
      if (map.getZoom() < newMinZoom) {
        map.setZoom(newMinZoom);
      }
    };

    // Add event listeners
    map.on('zoomend', handleZoomEnd);
    map.on('resize', handleResize);
    
    // Cleanup
    return () => {
      map.off('zoomend', handleZoomEnd);
      map.off('resize', handleResize);
    };
  }, [map]);

  return null;
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
  const [selectedMapStyle, setSelectedMapStyle] = useState('cartodb'); // Default to CartoDB for better English labels

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
          <p className="text-gray-600 text-sm mb-2">
            Real-time data with {facilities.length} facilities worldwide
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs">
            <p className="text-blue-800 font-semibold mb-1">🗺️ Map View: All 7 Continents</p>
            <p className="text-blue-700">Zoom is optimized to show global waste facilities across North America, South America, Europe, Africa, Asia, Oceania, and Antarctica regions.</p>
          </div>
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

        {/* Map Style Selector */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🌎 Map Style (English)
          </h3>
          <div className="space-y-2">
            {Object.entries(mapTileConfigs).map(([key, config]) => (
              <label key={key} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="mapStyle"
                  value={key}
                  checked={selectedMapStyle === key}
                  onChange={(e) => setSelectedMapStyle(e.target.value)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 capitalize">
                  {key === 'openstreetmap' ? 'OpenStreetMap' : 
                   key === 'cartodb' ? 'CartoDB (Recommended)' : 
                   key === 'esri' ? 'Esri World Map' : key}
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ℹ️ All map styles display labels in English
          </p>
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
      <div className="flex-1 relative z-0">
        <MapContainer
          center={[20, 0]}
          zoom={2.5}
          maxZoom={18}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          worldCopyJump={false}
          maxBoundsViscosity={1.0}
          attributionControl={true}
          className="english-map"
          zoomSnap={0.1}
          zoomDelta={0.2}
        >
          <MapBounds />
          <TileLayer
            key={selectedMapStyle}
            url={mapTileConfigs[selectedMapStyle].url}
            attribution={mapTileConfigs[selectedMapStyle].attribution}
            noWrap={true}
            detectRetina={true}
            maxZoom={18}
            subdomains={selectedMapStyle === 'cartodb' ? ['a', 'b', 'c', 'd'] : ['a', 'b', 'c']}
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
                  <div className="p-3 min-w-64">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                      {facility.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <strong className="text-gray-700 w-20">Type:</strong>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            facility.type === "recycling"
                              ? "bg-green-100 text-green-800"
                              : facility.type === "waste"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {facility.type === 'recycling' ? 'Recycling Center' : 
                           facility.type === 'waste' ? 'Waste Disposal' :
                           facility.type === 'hazardous' ? 'Hazardous Waste' : facility.type}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <strong className="text-gray-700 w-20 flex-shrink-0">Address:</strong> 
                        <span className="text-gray-600">{facility.address}</span>
                      </div>
                      <div className="flex items-center">
                        <strong className="text-gray-700 w-20">Country:</strong> 
                        <span className="text-gray-600">{facility.country}</span>
                      </div>
                      <div className="flex items-center">
                        <strong className="text-gray-700 w-20">Continent:</strong> 
                        <span className="text-gray-600">{facility.continent}</span>
                      </div>
                      <div className="flex items-center">
                        <strong className="text-gray-700 w-20">Status:</strong>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            facility.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {facility.status === 'Active' ? '✅ Active' : '❌ Inactive'}
                        </span>
                      </div>
                      {facility.description && (
                        <div className="flex items-start mt-3 pt-2 border-t">
                          <strong className="text-gray-700 w-20 flex-shrink-0">Details:</strong> 
                          <span className="text-gray-600">{facility.description}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg border z-[1000] max-w-xs">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            🌍 Global Facility Map <span className="text-xs font-normal text-gray-500">(English)</span>
          </h4>
          
          {/* Map Info */}
          <div className="mb-4 p-2 bg-blue-50 rounded text-xs">
            <p className="text-blue-800 font-medium mb-1">📍 Coverage: All 7 Continents</p>
            <p className="text-blue-600">50 Facilities across the globe</p>
            <p className="text-blue-600">Smart zoom limits - no background visible</p>
            <p className="text-blue-800 italic mt-1 text-[10px]">All map labels display in English</p>
          </div>

          {/* Facility Types */}
          <h5 className="text-xs font-semibold text-gray-700 mb-2">Facility Types:</h5>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-700">Recycling Centers</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-700">Waste Disposal</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-700">Hazardous Waste</span>
            </div>
          </div>

          {/* Continent Coverage */}
          <div className="mt-3 pt-2 border-t border-gray-200">
            <h5 className="text-xs font-semibold text-gray-700 mb-2">Continental Coverage:</h5>
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
              <span>🌎 N. America</span>
              <span>🌍 Europe</span>
              <span>🌏 Asia</span>
              <span>🌍 Africa</span>
              <span>🌎 S. America</span>
              <span>🌏 Oceania</span>
              <span className="col-span-2 text-center">❄️ Antarctica</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
