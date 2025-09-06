import React, { useState, useRef, useEffect } from 'react';
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
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  // Camera functionality
  const startCamera = async () => {
    try {
      setCameraError(null);
      console.log('📹 Requesting camera access...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile devices
        }
      });
      
      setCameraStream(stream);
      setShowCamera(true);
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          console.log('✅ Camera started successfully');
        }
      }, 100);
      
    } catch (err) {
      console.error('❌ Camera access error:', err);
      let errorMessage = 'Camera access denied or not available.';
      
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera permission denied. Please allow camera access and try again.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotSupportedError') {
        errorMessage = 'Camera not supported in this browser.';
      }
      
      setCameraError(errorMessage);
      setError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
    setCameraError(null);
    console.log('📹 Camera stopped');
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Camera not ready. Please try again.');
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob and create file
      canvas.toBlob((blob) => {
        if (blob) {
          // Create a file from the blob with a descriptive name
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const file = new File([blob], `camera_capture_${timestamp}.jpg`, {
            type: 'image/jpeg'
          });

          // Clean up previous preview
          if (previewUrl) {
            uploadUtils.revokePreviewURL(previewUrl);
          }

          // Set the captured file
          setSelectedFile(file);
          setPreviewUrl(uploadUtils.createPreviewURL(file));
          setError(null);
          setResult(null);

          // Stop camera after capture
          stopCamera();
          
          console.log('📸 Photo captured successfully:', file.name);
        }
      }, 'image/jpeg', 0.9); // High quality JPEG

    } catch (err) {
      console.error('❌ Photo capture error:', err);
      setError('Failed to capture photo. Please try again.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    if (showCamera) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Cleanup camera stream on component unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

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
    
    // Stop camera if running
    stopCamera();
    
    // Reset file inputs
    if (fileInputRef.current) fileInputRef.current.value = '';
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
            
            {!showCamera && (
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
                  <p className="text-gray-500 text-center">Use your device camera</p>
                </motion.button>
              </div>
            )}

            {/* Camera Interface */}
            <AnimatePresence>
              {showCamera && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <div className="bg-black rounded-xl p-4 relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-64 md:h-96 object-cover rounded-lg"
                    />
                    
                    {/* Camera Controls */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={capturePhoto}
                        className="bg-white text-gray-800 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={stopCamera}
                        className="bg-gray-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all duration-200"
                      >
                        ✕
                      </motion.button>
                    </div>
                    
                    {/* Camera Instructions */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-black bg-opacity-50 text-white rounded-lg p-3 text-sm">
                        <p className="text-center">
                          📸 Position the waste item in the center and tap the red button to capture
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden canvas for photo capture */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
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
