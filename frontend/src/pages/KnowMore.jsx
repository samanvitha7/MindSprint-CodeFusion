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
    <>
    <main className="min-h-screen bg-green-50">
      <Header />

      {/* Top Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-forest">
            Waste Knowledge Wheel
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            Click on a waste type to open a detailed panel with information.
          </p>
        </header>

        {/* Wheel + Guide */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
          {/* Left: Wheel */}
          <div className="w-full lg:w-[42%] flex justify-center">
            <WasteWheel
              items={WASTE_TYPES}
              onSelect={handleWheelSelect}
              sizeRem={26}
            />
          </div>

          {/* Right: Guide */}
          <div className="w-full lg:w-[55%] lg:mt-16"> {/* ⬅ pushed further down */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Waste Management Guide
              </h2>
              <p className="text-gray-700 mb-4">
                Select a waste type from the wheel to learn how to properly
                dispose of it, understand its environmental impact, and
                discover eco-friendly alternatives.
              </p>
              <p className="text-gray-700 italic">
                Click on a segment of the wheel to learn more about that waste
                type.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Box: Why It Matters */}
        <div className="mt-12 w-full bg-white rounded-2xl shadow-inner p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            Why Proper Waste Management Matters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-100 p-5 rounded-lg">
              <h3 className="font-semibold text-forest mb-2">
                Environmental Protection
              </h3>
              <p className="text-gray-700 text-sm">
                Proper waste disposal prevents pollution of soil, water, and air.
              </p>
            </div>
            <div className="bg-green-100 p-5 rounded-lg">
              <h3 className="font-semibold text-forest mb-2">
                Resource Conservation
              </h3>
              <p className="text-gray-700 text-sm">
                Recycling reduces the need for raw resource extraction.
              </p>
            </div>
            <div className="bg-green-100 p-5 rounded-lg">
              <h3 className="font-semibold text-forest mb-2">Energy Savings</h3>
              <p className="text-gray-700 text-sm">
                Recycling uses less energy than producing new materials.
              </p>
            </div>
            <div className="bg-green-100 p-5 rounded-lg">
              <h3 className="font-semibold text-forest mb-2">
                Economic Benefits
              </h3>
              <p className="text-gray-700 text-sm">
                Waste management creates jobs in recycling industries.
              </p>
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

      <Footer />
    </main>
    </>
  );
};

export default KnowMore;
