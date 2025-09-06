import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { modelService, uploadUtils, handleApiError } from '../services/api.js';

const WasteScanPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    try {
      // Clean up previous preview URL
      if (previewUrl) {
        uploadUtils.revokePreviewURL(previewUrl);
      }

      if (file) {
        // Validate file
        uploadUtils.validateImageFile(file);
        
        // Set file and create preview
        setSelectedFile(file);
        setPreviewUrl(uploadUtils.createPreviewURL(file));
        setError(null);
        setResult(null);
      }
    } catch (err) {
      setError(err.message);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await modelService.predictWaste(selectedFile);
      
      if (response.success) {
        setResult(response.data);
      } else {
        throw new Error(response.message || 'Prediction failed');
      }
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (previewUrl) {
      uploadUtils.revokePreviewURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
    
    // Reset file inputs
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🔍 AI Waste Scanner
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload or capture an image of waste, and our AI will classify it and provide 
              disposal instructions to help you recycle responsibly.
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Select an Image
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Upload from device */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUploadClick}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-green-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload from Device</h3>
                <p className="text-gray-500 text-center">Choose an image from your gallery</p>
              </motion.button>

              {/* Camera capture */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCameraClick}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Take Photo</h3>
                <p className="text-gray-500 text-center">Capture using your camera</p>
              </motion.button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Image Preview */}
            <AnimatePresence>
              {previewUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <div className="relative bg-gray-100 rounded-xl p-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-contain rounded-lg"
                    />
                    <button
                      onClick={handleReset}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePredict}
                disabled={!selectedFile || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  '🔍 Analyze Waste'
                )}
              </motion.button>

              {(selectedFile || result) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Reset
                </motion.button>
              )}
            </div>
          </div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-2">❌</span>
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
                  <h2 className="text-2xl font-bold mb-2">🎯 Classification Result</h2>
                  <p className="opacity-90">AI Analysis Complete</p>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Classification Info */}
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Category</h3>
                        <div 
                          className="text-2xl font-bold px-4 py-2 rounded-lg inline-block text-white"
                          style={{ backgroundColor: result.color }}
                        >
                          {result.category}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Confidence</h3>
                        <div className="bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${result.confidence * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {Math.round(result.confidence * 100)}% confident
                        </p>
                      </div>
                    </div>

                    {/* Instructions and Facts */}
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                          <span className="mr-2">♻️</span>
                          Disposal Instructions
                        </h3>
                        <p className="text-blue-700">{result.instruction}</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                          <span className="mr-2">🌱</span>
                          Eco Fact
                        </h3>
                        <p className="text-green-700">{result.fact}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                      Analysis completed on {new Date(result.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WasteScanPage;
