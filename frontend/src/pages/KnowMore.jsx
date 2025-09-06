// src/pages/KnowMore.jsx
import React, { useState } from "react";
import Header from "../components/Header";  
import Footer from "../components/Footer";  
import { WASTE_TYPES } from "../data/wasteData";
import WasteWheel from "../components/WasteWheel";
import WasteModal from "../components/WasteModal";

const KnowMore = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWheelSelect = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-green-50">
      <Header />   
      <section className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-forest">
            Waste Knowledge Wheel 
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
            Click on a waste type to open a detailed panel with information.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* SIDE wheel - 35% of screen */}
          <div className="w-full lg:w-[35%] flex justify-center">
            <WasteWheel 
              items={WASTE_TYPES} 
              onSelect={handleWheelSelect}
              sizeRem={22}
            />
          </div>

          {/* MAIN content - 65% of screen */}
          <div className="w-full lg:w-[65%] mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-inner p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Waste Management Guide
              </h2>
              
              <p className="text-gray-700 mb-6">
                Select a waste type from the wheel to learn how to properly dispose of it,
                understand its environmental impact, and discover eco-friendly alternatives.
              </p>

              {activeIndex !== null ? (
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={WASTE_TYPES[activeIndex].image}
                    alt={WASTE_TYPES[activeIndex].category}
                    className="w-32 h-32 object-contain rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">
                      {WASTE_TYPES[activeIndex].category}
                    </h3>
                    <p className="text-gray-700 mt-2 italic">
                      {WASTE_TYPES[activeIndex].fact}
                    </p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition-colors"
                    >
                      Open Detailed Panel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-soft/20 p-4 rounded-lg text-center">
                  <p className="text-gray-600">
                    Click on a segment of the wheel to learn more about that waste type.
                  </p>
                </div>
              )}
            </div>
            
            {/* Additional educational content */}
            <div className="mt-6 bg-white rounded-2xl shadow-inner p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Why Proper Waste Management Matters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-soft/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-forest mb-2">Environmental Protection</h3>
                  <p className="text-gray-700 text-sm">Proper waste disposal prevents pollution of soil, water, and air.</p>
                </div>
                <div className="bg-soft/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-forest mb-2">Resource Conservation</h3>
                  <p className="text-gray-700 text-sm">Recycling reduces the need for raw resource extraction.</p>
                </div>
                <div className="bg-soft/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-forest mb-2">Energy Savings</h3>
                  <p className="text-gray-700 text-sm">Recycling uses less energy than producing new materials.</p>
                </div>
                <div className="bg-soft/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-forest mb-2">Economic Benefits</h3>
                  <p className="text-gray-700 text-sm">Waste management creates jobs in recycling industries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && activeIndex !== null && (
        <WasteModal
          item={WASTE_TYPES[activeIndex]}
          onClose={handleCloseModal}
          slideFrom="right"
        />
      )}
      <Footer/>
    </main>
  );
};

export default KnowMore;