import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const WasteModal = ({ item, onClose, slideFrom = "right" }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // animation initial state based on slideFrom
  const initial =
    slideFrom === "right"
      ? { x: "100%", opacity: 0 }
      : slideFrom === "left"
      ? { x: "-100%", opacity: 0 }
      : { scale: 0.9, opacity: 0 };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.category} details`}
    >
      <motion.div
        initial={initial}
        animate={{ x: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative bg-white w-[80vw] h-[80vh] max-w-6xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 shadow focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Close"
        >
          ✖
        </button>

        {/* Grid: left image/title, right details */}
        <div className="h-full grid grid-cols-1 md:grid-cols-2">
          {/* LEFT panel: image + title */}
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-8">
            <img
              src={item.image}
              alt={item.category}
              className="w-44 h-44 object-contain drop-shadow-md"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-green-700">
              {item.category}
            </h2>
          </div>

          {/* RIGHT panel: info */}
          <div className="h-full overflow-y-auto p-6 md:p-8 space-y-6">
            <section className="bg-green-50 rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-green-800">♻ Recycling Ways</h3>
              <p className="mt-2 text-gray-800">{item.instruction}</p>
            </section>

            <section className="bg-red-50 rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-red-700">⚠ Hazards</h3>
              <p className="mt-2 text-gray-800">{item.hazard}</p>
            </section>

            <section className="bg-emerald-50 rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-700">💡 Eco-Fact</h3>
              <p className="mt-2 text-gray-800">{item.fact}</p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WasteModal;