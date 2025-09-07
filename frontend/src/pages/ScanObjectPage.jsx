import React, { useState, useRef } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function ScanObjectPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
      setResult(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first!");
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult({
        category: res.data.predicted_class,
        confidence: res.data.confidence,
        instruction: "Please handle according to local guidelines.",
        fact: "Recycling helps conserve natural resources.",
        timestamp: new Date().toLocaleString()
      });
      setCount((c) => c + 1);
    } catch (err) {
      console.error(err);
      setError("Error contacting backend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-soft/40 via-soft/20 to-white">
      <Header />
      
      <section className="max-w-7xl mx-auto px-4 py-16 font-poppins">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#1d3557] via-[#264653] to-[#2a9d8f] bg-clip-text text-transparent drop-shadow">
            AI Waste Scanner
          </h1>
          <p className="mt-3 text-forest max-w-2xl mx-auto text-lg">
            Upload an image of waste and let our AI classify it with disposal instructions.
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14">
          {/* Left: Upload Section */}
          <div className="w-full lg:w-[50%]">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-forest mb-6 text-center">
                Upload Waste Image
              </h2>
              
              {/* Upload Button - Only show when no image is selected */}
              {!previewUrl && (
                <div className="mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUploadClick}
                    className="w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-mint/50 rounded-xl hover:border-forest hover:bg-soft/20 transition-all duration-300"
                  >
                    <div className="text-6xl mb-4 text-forest">📁</div>
                    <h3 className="text-xl font-semibold text-forest mb-2">Choose Image</h3>
                    <p className="text-mint text-center">Click to select a waste image from your device</p>
                  </motion.button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}

              {/* Image Preview */}
              <AnimatePresence>
                {previewUrl && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <div className="relative bg-soft/20 rounded-xl p-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-64 object-contain rounded-lg"
                      />
                      <button
                        onClick={handleReset}
                        className="absolute top-2 right-2 bg-forest hover:bg-navy text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-forest to-mint text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    '🔍 Analyze Waste'
                  )}
                </motion.button>

                {(file || result) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="px-6 py-3 bg-navy text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Reset
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Results or Guide */}
          <div className="w-full lg:w-[50%]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-forest mb-2">🎯 Classification Result</h3>
                    <p className="text-mint">AI Analysis Complete</p>
                  </div>

                  <div className="space-y-6">
                    {/* Category */}
                    <div className="text-center">
                      <div className="inline-block px-6 py-3 bg-gradient-to-r from-forest to-mint text-white text-xl font-bold rounded-lg">
                        {result.category}
                      </div>
                    </div>

                    {/* Confidence */}
                    <div>
                      <h4 className="text-lg font-semibold text-forest mb-2">Confidence Level</h4>
                      <div className="bg-soft/30 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-forest to-mint h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${result.confidence * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-mint mt-1 text-center">
                        {Math.round(result.confidence * 100)}% confident
                      </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-gradient-to-br from-soft/20 to-white p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-forest mb-2 flex items-center">
                        <span className="mr-2">♻️</span>
                        Disposal Instructions
                      </h4>
                      <p className="text-mint">{result.instruction}</p>
                    </div>

                    {/* Eco Fact */}
                    <div className="bg-gradient-to-br from-soft/20 to-white p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-forest mb-2 flex items-center">
                        <span className="mr-2">🌱</span>
                        Eco Fact
                      </h4>
                      <p className="text-mint">{result.fact}</p>
                    </div>

                    {/* Timestamp */}
                    <div className="text-center text-sm text-mint">
                      Analysis completed: {result.timestamp}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-forest mb-4">
                    How It Works
                  </h2>
                  <div className="space-y-4 text-mint leading-relaxed">
                    <p>
                      Upload an image of waste material and our AI will analyze it to determine the waste type and provide proper disposal instructions.
                    </p>
                    <div className="space-y-2">
                      <p><strong className="text-forest">Step 1:</strong> Click "Choose Image" to select a photo</p>
                      <p><strong className="text-forest">Step 2:</strong> Click "Analyze Waste" to classify</p>
                      <p><strong className="text-forest">Step 3:</strong> Get disposal instructions and eco-tips</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">❌</span>
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Counter */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-forest to-mint text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                🌟 You have classified {count} item{count > 1 ? 's' : ''} today!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Information Section */}
        <div className="mt-16 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-inner p-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1d3557] via-[#264653] to-[#2a9d8f] bg-clip-text text-transparent mb-8 text-center">
            Why Use AI for Waste Classification?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Accurate Classification",
                desc: "AI provides precise identification of waste materials for proper disposal.",
              },
              {
                title: "Environmental Impact",
                desc: "Proper classification reduces contamination and improves recycling rates.",
              },
              {
                title: "Educational Value",
                desc: "Learn about different waste types and their environmental effects.",
              },
              {
                title: "Sustainable Future",
                desc: "Contribute to a cleaner planet through informed waste management.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-soft/10 to-white p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <h3 className="font-semibold text-forest mb-2">
                  {item.title}
                </h3>
                <p className="text-mint text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
    </>
  );
}