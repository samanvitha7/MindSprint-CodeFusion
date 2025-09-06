// src/pages/KnowMore.jsx
import React, { useState } from "react";
import Header from "../components/Header";  
import { WASTE_TYPES } from "../data/wasteData";
import WasteWheel from "../components/WasteWheel";
import WasteModal from "../components/WasteModal";

const KnowMore = () => {
  // activeIndex: null = none open; otherwise index of selected item
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <main className="min-h-screen bg-green-50">
      {/* Navbar */}
      <Header />   
      <section className="max-w-6xl mx-auto px-6 py-10">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-forest">
            Waste Knowledge Wheel 
          </h1>
          <p className="mt-2 text-gray-700">
            Hover the wheel to preview and click a label to open a detailed panel.
          </p>
        </header>

        {/* Layout: wheel on left (or right), main content on right */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* SIDE wheel */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <WasteWheel items={WASTE_TYPES} onSelect={setActiveIndex} sizeRem={18} />
          </div>

          {/* MAIN content / preview */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-2xl shadow-inner p-6">
              <h2 className="text-2xl font-bold text-green-700">
                Quick preview
              </h2>
              <p className="mt-3 text-gray-700">
                Click any label on the wheel to open a detailed panel with image,
                recycling instructions, hazards, and an eco-fact.
              </p>

              {/* Inline selected preview (small) */}
              {activeIndex !== null ? (
                <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={WASTE_TYPES[activeIndex].image}
                    alt={WASTE_TYPES[activeIndex].category}
                    className="w-24 h-24 object-contain rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">
                      {WASTE_TYPES[activeIndex].category}
                    </h3>
                    <p className="text-gray-700 mt-1 italic">
                      {WASTE_TYPES[activeIndex].fact}
                    </p>
                    <button
                      onClick={() => {}}
                      className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-md shadow"
                    >
                      Click wheel label again to re-open panel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-gray-600">No item selected yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal slide-in from right */}
      {activeIndex !== null && (
        <WasteModal
          item={WASTE_TYPES[activeIndex]}
          onClose={() => setActiveIndex(null)}
          slideFrom="right"
        />
      )}
    </main>
  );
};

export default KnowMore;
