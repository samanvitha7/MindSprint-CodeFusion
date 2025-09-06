// components/Hacks.jsx
"use client";
import React from "react";
import "./Hacks.css";

const categories = [
  {
    title: "Plastic",
    description:
      "How to sort, clean, and prepare common plastic items for recycling.",
    videos: [
      "https://www.youtube.com/embed/48-0ywru2JU?si=v81ehcith9nSlxa9",
      "https://www.youtube.com/embed/E19QrSIWfQU?si=zORT7mbG6pjJVQe8",
    ],
  },
  {
    title: "Metal",
    description:
      "Tips for recycling cans, tins, and other metal items safely and efficiently.",
    videos: [
      "https://www.youtube.com/embed/o1Qm6Gc7jG4?si=aIV0LVJ_EYfab3Tb",
      "https://www.youtube.com/embed/M0XuJsb2Fgo?si=x-TQ-A1vUUOxOmmI",
    ],
  },
  {
    title: "E-Waste",
    description:
      "Safe disposal and recycling options for electronics and batteries.",
    videos: [
      "https://www.youtube.com/embed/_WlxZ53mavg?si=8e-5swsRI-Ig_2i8",
      "https://www.youtube.com/embed/dKr90vgVSCA?si=3aXoPmQgZcLzRSSl",
    ],
  },
  {
    title: "Organic",
    description:
      "Learn composting techniques and how to manage food & garden waste naturally.",
    videos: [
      "https://www.youtube.com/embed/xhu7Gu2G3nE?si=SryQfnxGlb8kx-Mh",
      "https://www.youtube.com/embed/egyNJ7xPyoQ?si=QMEiJEmn0tjlL7b_",
    ],
  },
  {
    title: "Glass",
    description:
      "How to safely recycle bottles, jars, and other glass products.",
    videos: [
      "https://www.youtube.com/embed/n4vlGT9-Zng?si=dNUIDgJiTTMZkUVr",
      "https://www.youtube.com/embed/fZnrw3EsX2A?si=_pOzb8iZ0G3tbFWD",
    ],
  },
  {
    title: "Paper",
    description:
      "Reduce waste by recycling newspapers, office paper, and cardboard effectively.",
    videos: [
      "https://www.youtube.com/embed/sShUJHYE4Ww?si=52MtsGvkhzYjGmAC",
      "https://www.youtube.com/embed/-yirLPDp6VM?si=ppmpj-sroMmThLp_",
    ],
  },
];

export default function Hacks() {
  return (
    <div className="page-wrapper">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#2a6250] mb-10 text-center">
          Recycling Categories
        </h1>

        {categories.map((cat, idx) => (
          <section
            key={idx}
            className="category-card shadow-md rounded-xl p-6 mb-10"
          >
            {/* Category Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#2a6250]">
                {cat.title}
              </h2>
              <p className="text-[#2a6250] mt-2">{cat.description}</p>
            </div>

            {/* Video Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.videos.map((embedUrl, i) => (
                <div
                  key={i}
                  className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow"
                >
                  <iframe
                    src={embedUrl}
                    title={`${cat.title} video ${i + 1}`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
