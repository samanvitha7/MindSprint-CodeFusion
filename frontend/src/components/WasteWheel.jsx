// src/components/WasteWheel.jsx (Alternative Version)
import React from 'react';

const WasteWheel = ({ items, onSelect, sizeRem = 22 }) => {
  const totalItems = items.length;
  const angleIncrement = 360 / totalItems;
  
  return (
    <div className="relative mx-auto" style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}>
      {/* Wheel container */}
      <div 
        className="relative rounded-full overflow-hidden border-4 border-forest/30 shadow-lg"
        style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
      >
        {/* Wheel segments */}
        {items.map((item, index) => {
          const rotation = index * angleIncrement;
          return (
            <div
              key={index}
              className="absolute inset-0 origin-center cursor-pointer"
              style={{
                clipPath: `conic-gradient(from ${rotation}deg, ${item.color} 0deg, ${item.color} ${angleIncrement}deg, transparent ${angleIncrement}deg)`,
                transform: `rotate(${rotation}deg)`,
              }}
              onClick={() => onSelect(index)}
            />
          );
        })}
        
        {/* Labels - positioned around the wheel without rotation */}
        {items.map((item, index) => {
          const angle = (index * angleIncrement + angleIncrement / 2 - 90) * Math.PI / 180;
          const labelRadius = (sizeRem / 2) * 0.75;
          const labelX = (sizeRem / 2) + labelRadius * Math.cos(angle);
          const labelY = (sizeRem / 2) + labelRadius * Math.sin(angle);
          
          return (
            <div
              key={index}
              className="absolute text-sm font-semibold text-white bg-navy/90 px-3 py-1 rounded-lg whitespace-nowrap cursor-pointer z-10 shadow-md"
              style={{
                left: `${labelX}rem`,
                top: `${labelY}rem`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => onSelect(index)}
            >
              {item.category}
            </div>
          );
        })}
        
        {/* Center circle */}
        <div 
          className="absolute rounded-full bg-forest text-white flex items-center justify-center text-center font-bold shadow-md border-4 border-white"
          style={{
            width: `${sizeRem * 0.35}rem`,
            height: `${sizeRem * 0.35}rem`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="text-sm">Waste Wheel</span>
        </div>
      </div>
    </div>
  );
};

export default WasteWheel;