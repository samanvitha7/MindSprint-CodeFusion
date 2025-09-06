import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Service Functions

/**
 * Waste Classification Model APIs
 */
export const modelService = {
  // Predict waste classification from image
  predictWaste: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post('/model/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Prediction failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get available waste categories
  getCategories: async () => {
    try {
      const response = await api.get('/model/categories');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.response?.data?.message || error.message}`);
    }
  },

  // Health check for model service
  checkHealth: async () => {
    try {
      const response = await api.get('/model/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.response?.data?.message || error.message}`);
    }
  }
};

/**
 * Rules APIs
 */
export const rulesService = {
  // Get all rules
  getAllRules: async () => {
    try {
      const response = await api.get('/rules');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch rules: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get rule by ID
  getRuleById: async (id) => {
    try {
      const response = await api.get(`/rules/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch rule: ${error.response?.data?.message || error.message}`);
    }
  }
};

/**
 * Facilities APIs
 */
export const facilitiesService = {
  // Get all facilities
  getAllFacilities: async () => {
    try {
      const response = await api.get('/facilities');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch facilities: ${error.response?.data?.message || error.message}`);
    }
  },

  // Add new facilities (bulk)
  addFacilities: async (facilities) => {
    try {
      const response = await api.post('/facilities/add', facilities);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add facilities: ${error.response?.data?.message || error.message}`);
    }
  }
};

/**
 * Utility function to handle file upload
 */
export const uploadUtils = {
  // Validate image file
  validateImageFile: (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file) {
      throw new Error('No file selected');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please select a JPEG, PNG, or GIF image.');
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Please select an image under 10MB.');
    }

    return true;
  },

  // Create preview URL for uploaded image
  createPreviewURL: (file) => {
    return URL.createObjectURL(file);
  },

  // Clean up preview URL to prevent memory leaks
  revokePreviewURL: (url) => {
    URL.revokeObjectURL(url);
  }
};

/**
 * Error handler utility
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'Server error occurred';
    console.error('API Error:', error.response.status, message);
    return {
      type: 'server',
      status: error.response.status,
      message: message
    };
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error:', error.request);
    return {
      type: 'network',
      message: 'Unable to connect to server. Please check your connection.'
    };
  } else {
    // Other error
    console.error('Error:', error.message);
    return {
      type: 'client',
      message: error.message
    };
  }
};

// Default export
export default api;
