import React from "react";
import {motion} from "framer-motion";

const WasteWheel = ({ items = [], onSelect = () => {}, sizeRem = 18 }) => {
  const anglePerItem = 360 / Math.max(1, items.length);
  const radiusRem = sizeRem * 0.45; // radius in rem relative to diameter
  const diameterStyle = { width: `${sizeRem}rem`, height: `${sizeRem}rem` };

  return (
    <div
      className="relative rounded-full border-4 border-green-300 flex items-center justify-center bg-white/60 shadow-md"
      style={diameterStyle}
      aria-hidden={false}
    >
      {/* center hint */}
      <p className="text-xs md:text-sm text-green-800/70 select-none text-center px-4 absolute">
        hover to preview · click to open
      </p>

      {items.map((item, index) => {
        const angle = index * anglePerItem;
        const transform = `rotate(${angle}deg) translate(${radiusRem}rem) rotate(-${angle}deg)`;

        return (
          <motion.button
            key={item.id}
            onClick={() => onSelect(index)}
            whileHover={{ scale: 1.2 }}
            whileFocus={{ scale: 1.2 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/70 backdrop-blur"
            style={{
              left: "50%",
              top: "50%",
              transform
            }}
            aria-label={`Open details for ${item.category}`}
          >
            <span className="text-green-900 font-semibold text-sm md:text-base whitespace-nowrap">
              {item.category}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default WasteWheel;