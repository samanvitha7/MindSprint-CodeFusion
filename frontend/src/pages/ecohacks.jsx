// pages/ecohacks.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const ecoHacksData = [
  {
    title: "Plastic",
    icon: "♻️",
    description: "How to sort, clean, and prepare common plastic items for recycling.",
    tips: [
      "Remove caps and labels before recycling plastic bottles",
      "Clean containers to remove food residue",
      "Check recycling codes - #1 and #2 are most commonly accepted",
      "Avoid putting plastic bags in regular recycling bins"
    ],
    videos: [
      {
        url: "https://www.youtube.com/embed/48-0ywru2JU?si=v81ehcith9nSlxa9",
        thumbnail: "https://img.youtube.com/vi/48-0ywru2JU/maxresdefault.jpg",
        fallbackThumbnail: "https://img.youtube.com/vi/48-0ywru2JU/hqdefault.jpg",
        title: "Plastic Recycling Guide"
      },
      {
        url: "https://www.youtube.com/embed/E19QrSIWfQU?si=zORT7mbG6pjJVQe8",
        thumbnail: "https://img.youtube.com/vi/E19QrSIWfQU/maxresdefault.jpg",
        fallbackThumbnail: "https://img.youtube.com/vi/E19QrSIWfQU/hqdefault.jpg",
        title: "DIY Plastic Upcycling"
      },
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Metal",
    icon: "🔩",
    description: "Tips for recycling cans, tins, and other metal items safely and efficiently.",
    tips: [
      "Rinse aluminum cans and steel cans before recycling",
      "Remove labels when possible for better processing",
      "Crush cans to save space but check local guidelines",
      "Separate aluminum from steel using a magnet test"
    ],
    videos: [
      {
        url: "https://www.youtube.com/embed/o1Qm6Gc7jG4?si=aIV0LVJ_EYfab3Tb",
        thumbnail: "https://img.youtube.com/vi/o1Qm6Gc7jG4/hqdefault.jpg",
        title: "Metal Recycling Process"
      },
      {
        url: "https://www.youtube.com/embed/M0XuJsb2Fgo?si=x-TQ-A1vUUOxOmmI",
        thumbnail: "https://img.youtube.com/vi/M0XuJsb2Fgo/hqdefault.jpg",
        title: "Creative Metal Reuse"
      },
    ],
    color: "from-gray-500 to-gray-600"
  },
  {
    title: "E-Waste",
    icon: "💻",
    description: "Safe disposal and recycling options for electronics and batteries.",
    tips: [
      "Never throw electronics in regular trash",
      "Remove personal data before disposing devices",
      "Find certified e-waste recycling centers",
      "Consider donating working electronics"
    ],
    videos: [
      {
        url: "https://www.youtube.com/embed/_WlxZ53mavg?si=8e-5swsRI-Ig_2i8",
        thumbnail: "https://img.youtube.com/vi/_WlxZ53mavg/hqdefault.jpg",
        title: "E-Waste Recycling Guide"
      },
      {
        url: "https://www.youtube.com/embed/dKr90vgVSCA?si=3aXoPmQgZcLzRSSl",
        thumbnail: "https://img.youtube.com/vi/dKr90vgVSCA/hqdefault.jpg",
        title: "Electronics Repair Tips"
      },
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Organic",
    icon: "🌱",
    description: "Learn composting techniques and how to manage food & garden waste naturally.",
    tips: [
      "Start a compost bin with brown and green materials",
      "Avoid composting meat, dairy, and oily foods",
      "Turn compost regularly for better decomposition",
      "Use finished compost to enrich garden soil"
    ],
    videos: [
      {
        url: "https://www.youtube.com/embed/xhu7Gu2G3nE?si=SryQfnxGlb8kx-Mh",
        thumbnail: "https://img.youtube.com/vi/xhu7Gu2G3nE/hqdefault.jpg",
        title: "Composting for Beginners"
      },
      {
        url: "https://www.youtube.com/embed/egyNJ7xPyoQ?si=QMEiJEmn0tjlL7b_",
        thumbnail: "https://img.youtube.com/vi/egyNJ7xPyoQ/hqdefault.jpg",
        title: "Home Composting Setup"
      },
    ],
    color: "from-green-500 to-green-600"
  },
  {
    title: "Glass",
    icon: "🍶",
    description: "How to safely recycle bottles, jars, and other glass products.",
    tips: [
      "Remove caps and lids from glass containers",
      "Rinse containers to remove food residue",
      "Separate by color when required",
      "Handle broken glass with extreme care"
    ],
    videos: [
      {
        url: "https://www.youtube.com/embed/n4vlGT9-Zng?si=dNUIDgJiTTMZkUVr",
        thumbnail: "https://img.youtube.com/vi/n4vlGT9-Zng/hqdefault.jpg",
        title: "Glass Recycling Process"
      },
      {
        url: "https://www.youtube.com/embed/fZnrw3EsX2A?si=_pOzb8iZ0G3tbFWD",
        thumbnail: "https://img.youtube.com/vi/fZnrw3EsX2A/hqdefault.jpg",
        title: "Glass Upcycling Ideas"
      },
    ],
    color: "from-teal-500 to-teal-600"
  },
  {
    title: "Paper",
    icon: "📄",
    description: "Reduce waste by recycling newspapers, office paper, and cardboard effectively.",
    tips: [
      "Remove staples and plastic windows from paper",
      "Keep paper dry and clean for recycling",
      "Separate cardboard from regular paper",
      "Shred sensitive documents before recycling"
    ],
    videos: [
      {
        url: "https://www.youtube.com/embed/sShUJHYE4Ww?si=52MtsGvkhzYjGmAC",
        thumbnail: "https://img.youtube.com/vi/sShUJHYE4Ww/hqdefault.jpg",
        title: "Paper Recycling Guide"
      },
      {
        url: "https://www.youtube.com/embed/-yirLPDp6VM?si=ppmpj-sroMmThLp_",
        thumbnail: "https://img.youtube.com/vi/-yirLPDp6VM/hqdefault.jpg",
        title: "Paper Craft Reuse"
      },
    ],
    color: "from-orange-500 to-orange-600"
  },
];

export default function Ecohacks() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-soft/40 via-soft/20 to-white">
      <Header />
      
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#1d3557] via-[#264653] to-[#2a9d8f] bg-clip-text text-transparent drop-shadow">
            Eco Hacks & Tips
          </h1>
          <p className="mt-3 text-forest max-w-2xl mx-auto text-lg">
            Discover practical recycling tips and sustainable living hacks for a greener future.
          </p>
        </header>

        {/* Category Grid with Inline Details */}
        <div className="space-y-8 mb-16">
          {/* Row-based layout for better positioning */}
          {Array.from({ length: Math.ceil(ecoHacksData.length / 3) }).map((_, rowIndex) => (
            <div key={rowIndex}>
              {/* Category Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {ecoHacksData.slice(rowIndex * 3, (rowIndex + 1) * 3).map((category, idx) => {
                  const actualIndex = rowIndex * 3 + idx;
                  return (
                    <motion.div
                      key={actualIndex}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(selectedCategory === actualIndex ? null : actualIndex)}
                      className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                        selectedCategory === actualIndex ? 'ring-2 ring-forest/30 shadow-xl' : ''
                      }`}
                    >
                      <div className="text-center mb-4">
                        <div className="text-5xl mb-3">{category.icon}</div>
                        <h3 className="text-2xl font-bold text-forest mb-2">{category.title}</h3>
                        <p className="text-mint text-sm leading-relaxed">{category.description}</p>
                      </div>
                      
                      <div className={`w-full h-1 bg-gradient-to-r ${category.color} rounded-full mb-4`}></div>
                      
                      <div className="text-center">
                        <span className="text-forest text-sm font-medium">
                          {selectedCategory === actualIndex ? 'Hide Details' : 'View Tips & Videos'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Selected Category Details - Appears in this row if selected */}
              <AnimatePresence>
                {selectedCategory !== null && 
                 selectedCategory >= rowIndex * 3 && 
                 selectedCategory < (rowIndex + 1) * 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-forest"
                  >
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">{ecoHacksData[selectedCategory].icon}</div>
                      <h2 className="text-3xl font-bold text-forest mb-2">
                        {ecoHacksData[selectedCategory].title} Recycling Guide
                      </h2>
                      <div className={`w-24 h-1 bg-gradient-to-r ${ecoHacksData[selectedCategory].color} rounded-full mx-auto`}></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Tips Section */}
                      <div className="bg-gradient-to-br from-soft/20 to-white p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                          <span className="mr-2">💡</span>
                          Recycling Tips
                        </h3>
                        <ul className="space-y-3">
                          {ecoHacksData[selectedCategory].tips.map((tip, tipIdx) => (
                            <li key={tipIdx} className="flex items-start text-forest">
                              <span className="text-mint mr-2 mt-1 text-sm">•</span>
                              <span className="text-sm leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Videos Section */}
                      <div className="bg-gradient-to-br from-soft/20 to-white p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                          <span className="mr-2">🎥</span>
                          Video Tutorials
                        </h3>
                        <div className="space-y-4">
                          {ecoHacksData[selectedCategory].videos.map((video, videoIdx) => (
                            <motion.div
                              key={videoIdx}
                              whileHover={{ scale: 1.02 }}
                              className="relative cursor-pointer rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-mint/10 to-soft/20 min-h-[140px] border-2 border-mint/20"
                              onClick={() => {
                                console.log('Video clicked:', video.title, video.url);
                                setModalVideo(video.url);
                              }}
                            >
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-32 object-cover"
                                onError={(e) => {
                                  // Try fallback thumbnail first
                                  if (video.fallbackThumbnail && e.target.src !== video.fallbackThumbnail) {
                                    e.target.src = video.fallbackThumbnail;
                                  } else {
                                    // If both thumbnails fail, show fallback content
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                  }
                                }}
                                onLoad={() => {
                                  console.log('Thumbnail loaded successfully:', video.title);
                                }}
                              />
                              {/* Fallback content when image fails */}
                              <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-mint/20 flex-col items-center justify-center hidden">
                                <div className="text-4xl mb-2">🎥</div>
                                <p className="text-forest font-semibold text-center px-4">{video.title}</p>
                              </div>
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <div className="bg-white/90 rounded-full p-4 shadow-lg">
                                  <span className="text-forest text-3xl">▶</span>
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <p className="text-white text-sm font-medium">{video.title}</p>
                                <p className="text-white/80 text-xs mt-1">Click to watch</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Close button */}
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="bg-forest hover:bg-navy text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        Close Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom Information Section */}
        <div className="mt-16 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-inner p-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1d3557] via-[#264653] to-[#2a9d8f] bg-clip-text text-transparent mb-8 text-center">
            Why Recycling Matters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Reduce Pollution",
                desc: "Proper recycling prevents harmful materials from contaminating our environment.",
                icon: "🌍"
              },
              {
                title: "Save Resources",
                desc: "Recycling conserves natural resources and reduces the need for raw materials.",
                icon: "🌳"
              },
              {
                title: "Save Energy",
                desc: "Manufacturing from recycled materials uses significantly less energy.",
                icon: "⚡"
              },
              {
                title: "Create Jobs",
                desc: "The recycling industry provides employment and supports the green economy.",
                icon: "💼"
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-soft/10 to-white p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
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

    {/* Video Modal */}
    <AnimatePresence>
      {modalVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setModalVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-navy rounded-2xl overflow-hidden w-full max-w-4xl relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-forest/10 p-4 border-b border-forest/20">
              <h3 className="text-white font-semibold text-lg">Video Tutorial</h3>
            </div>
            
            {/* Video Container */}
            <div className="relative bg-black">
              <iframe
                src={modalVideo}
                title="Eco Hack Video"
                className="w-full h-[280px] md:h-[480px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onError={(e) => {
                  console.log('Video failed to load:', e);
                }}
              ></iframe>
            </div>
            
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-forest/80 hover:bg-forest text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors text-xl font-bold shadow-lg backdrop-blur-sm"
              onClick={() => setModalVideo(null)}
              title="Close video"
            >
              ✕
            </button>
            
            {/* Fallback message */}
            <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm rounded-2xl hidden" id="video-fallback">
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-white text-xl font-bold mb-2">Video Unavailable</h3>
                <p className="text-white/80 mb-4">The video could not be loaded. Please try again later.</p>
                <button
                  onClick={() => setModalVideo(null)}
                  className="bg-forest hover:bg-mint text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
