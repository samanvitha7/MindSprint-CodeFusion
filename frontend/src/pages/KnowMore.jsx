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
    <main className="min-h-screen bg-gradient-to-br from-soft/40 via-soft/20 to-white">
      <Header />

      {/* Top Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 font-poppins">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#1d3557] via-[#264653] to-[#2a9d8f] bg-clip-text text-transparent drop-shadow">
            Waste Knowledge Wheel
          </h1>
          <p className="mt-3 text-forest max-w-2xl mx-auto text-lg">
            Click on a waste type to open a detailed panel with information.
          </p>
        </header>

        {/* Wheel + Guide */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14">
          {/* Left: Wheel */}
          <div className="w-full lg:w-[42%] flex justify-center">
            <div className="rounded-2xl p-6 bg-transparent">
              <WasteWheel
                items={WASTE_TYPES}
                onSelect={handleWheelSelect}
                sizeRem={28}
              />
            </div>
          </div>

          {/* Right: Guide */}
          <div className="w-full lg:w-[55%] flex lg:self-center mt-8 lg:mt-0">
            <div className="bg-white/95 rounded-2xl shadow-lg px-8 py-14 w-full">
              <h2 className="text-2xl font-bold text-forest mb-4">
                Waste Management Guide
              </h2>
              <p className="text-mint mb-4 leading-relaxed">
                Select a waste type from the wheel to learn how to properly
                dispose of it, understand its environmental impact, and discover
                eco-friendly alternatives.
              </p>
              <p className="text-forest italic">
                Click on a segment of the wheel to learn more about that waste
                type.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Box: Why It Matters */}
        <div className="mt-16 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-inner p-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1d3557] via-[#264653] to-[#2a9d8f] bg-clip-text text-transparent mb-8 text-center">
            Why Proper Waste Management Matters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Environmental Protection",
                desc: "Proper waste disposal prevents pollution of soil, water, and air.",
              },
              {
                title: "Resource Conservation",
                desc: "Recycling reduces the need for raw resource extraction.",
              },
              {
                title: "Energy Savings",
                desc: "Recycling uses less energy than producing new materials.",
              },
              {
                title: "Economic Benefits",
                desc: "Waste management creates jobs in recycling industries.",
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
