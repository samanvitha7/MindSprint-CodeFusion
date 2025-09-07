// components/Hacks.jsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample leaf SVGs (you can replace with your own SVGs or Lottie)
const leaves = [
  { id: 1, size: 40, left: "10%", delay: 0 },
  { id: 2, size: 30, left: "50%", delay: 2 },
  { id: 3, size: 50, left: "80%", delay: 1 },
  { id: 4, size: 35, left: "30%", delay: 3 },
  { id: 5, size: 25, left: "70%", delay: 1.5 },
];

const categories = [
  {
    title: "Plastic",
    description:
      "How to sort, clean, and prepare common plastic items for recycling.",
    videos: [
      {
        url: "https://www.youtube.com/embed/48-0ywru2JU?si=v81ehcith9nSlxa9",
        thumbnail: "https://img.youtube.com/vi/48-0ywru2JU/hqdefault.jpg",
      },
      {
        url: "https://www.youtube.com/embed/E19QrSIWfQU?si=zORT7mbG6pjJVQe8",
        thumbnail: "https://img.youtube.com/vi/E19QrSIWfQU/hqdefault.jpg",
      },
    ],
  },
  {
    title: "Metal",
    description:
      "Tips for recycling cans, tins, and other metal items safely and efficiently.",
    videos: [
      {
        url: "https://www.youtube.com/embed/o1Qm6Gc7jG4?si=aIV0LVJ_EYfab3Tb",
        thumbnail: "https://img.youtube.com/vi/o1Qm6Gc7jG4/hqdefault.jpg",
      },
      {
        url: "https://www.youtube.com/embed/M0XuJsb2Fgo?si=x-TQ-A1vUUOxOmmI",
        thumbnail: "https://img.youtube.com/vi/M0XuJsb2Fgo/hqdefault.jpg",
      },
    ],
  },
  {
    title: "E-Waste",
    description:
      "Safe disposal and recycling options for electronics and batteries.",
    videos: [
      {
        url: "https://www.youtube.com/embed/_WlxZ53mavg?si=8e-5swsRI-Ig_2i8",
        thumbnail: "https://img.youtube.com/vi/_WlxZ53mavg/hqdefault.jpg",
      },
      {
        url: "https://www.youtube.com/embed/dKr90vgVSCA?si=3aXoPmQgZcLzRSSl",
        thumbnail: "https://img.youtube.com/vi/dKr90vgVSCA/hqdefault.jpg",
      },
    ],
  },
  {
    title: "Organic",
    description:
      "Learn composting techniques and how to manage food & garden waste naturally.",
    videos: [
      {
        url: "https://www.youtube.com/embed/xhu7Gu2G3nE?si=SryQfnxGlb8kx-Mh",
        thumbnail: "https://img.youtube.com/vi/xhu7Gu2G3nE/hqdefault.jpg",
      },
      {
        url: "https://www.youtube.com/embed/egyNJ7xPyoQ?si=QMEiJEmn0tjlL7b_",
        thumbnail: "https://img.youtube.com/vi/egyNJ7xPyoQ/hqdefault.jpg",
      },
    ],
  },
  {
    title: "Glass",
    description:
      "How to safely recycle bottles, jars, and other glass products.",
    videos: [
      {
        url: "https://www.youtube.com/embed/n4vlGT9-Zng?si=dNUIDgJiTTMZkUVr",
        thumbnail: "https://img.youtube.com/vi/n4vlGT9-Zng/hqdefault.jpg",
      },
      {
        url: "https://www.youtube.com/embed/fZnrw3EsX2A?si=_pOzb8iZ0G3tbFWD",
        thumbnail: "https://img.youtube.com/vi/fZnrw3EsX2A/hqdefault.jpg",
      },
    ],
  },
  {
    title: "Paper",
    description:
      "Reduce waste by recycling newspapers, office paper, and cardboard effectively.",
    videos: [
      {
        url: "https://www.youtube.com/embed/sShUJHYE4Ww?si=52MtsGvkhzYjGmAC",
        thumbnail: "https://img.youtube.com/vi/sShUJHYE4Ww/hqdefault.jpg",
      },
      {
        url: "https://www.youtube.com/embed/-yirLPDp6VM?si=ppmpj-sroMmThLp_",
        thumbnail: "https://img.youtube.com/vi/-yirLPDp6VM/hqdefault.jpg",
      },
    ],
  },
];


export default function Hacks() {
  const [openIndex, setOpenIndex] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  return (
    <div className="relative page-wrapper min-h-screen bg-green-50 py-12 overflow-hidden">
      {/* Floating Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ y: 100 + Math.random() * 200, opacity: 0 }}
          animate={{ y: -200, opacity: 1, rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15 + Math.random() * 10,
            delay: leaf.delay,
          }}
          className="absolute pointer-events-none" // <-- ADD THIS
          style={{ left: leaf.left, width: leaf.size, height: leaf.size, zIndex: 0 }} // <-- ensure zIndex is behind content
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#2a6250"
          >
            <path d="M12 2C8 8 2 8 2 12s6 4 10 10 10-6 10-10S16 2 12 2z" />
          </svg>
        </motion.div>
      ))}


      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-bold text-[#2a6250] mb-10 text-center">
          Recycling Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="category-card bg-white rounded-xl shadow-md p-8 min-h-[200px] cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <h2 className="text-2xl font-semibold text-[#2a6250] mb-2">
                {cat.title}
              </h2>
              <p className="text-[#2a6250]">{cat.description}</p>

              {/* Accordion */}
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 grid grid-cols-2 gap-4"
                  >
                    {cat.videos.map((video, i) => (
                      <div
                        key={i}
                        className="relative cursor-pointer rounded-lg overflow-hidden shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalVideo(video.url);
                        }}
                      >
                        <img
                          src={video.thumbnail}
                          alt={`${cat.title} video ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-3xl">▶</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-black rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={modalVideo}
                title="Video Player"
                className="w-full h-[400px] md:h-[500px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold"
                onClick={() => setModalVideo(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
