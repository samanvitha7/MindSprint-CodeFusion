// src/components/WasteModal.jsx
import React, { useEffect } from 'react';

const WasteModal = ({ item, onClose, slideFrom = 'right' }) => {
  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getSlideClass = () => {
    switch(slideFrom) {
      case 'right': return 'translate-x-0';
      case 'left': return '-translate-x-0';
      case 'top': return 'translate-y-0';
      case 'bottom': return '-translate-y-0';
      default: return 'translate-x-0';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className={`fixed top-0 ${slideFrom === 'right' ? 'right-0' : 'left-0'} h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${getSlideClass()}`}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-forest text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">{item.category}</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-mint transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <img 
                src={item.image} 
                alt={item.category}
                className="w-48 h-48 object-contain rounded-lg"
              />
            </div>
            
            <div className="space-y-6">
              {/* Recycling Instructions */}
              <div>
                <h3 className="text-lg font-semibold text-forest mb-2">How to Recycle</h3>
                <ul className="list-disc list-inside space-y-1">
                  {item.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-700">{instruction}</li>
                  ))}
                </ul>
              </div>
              
              {/* Hazards */}
              {item.hazards && item.hazards.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-forest mb-2">Potential Hazards</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {item.hazards.map((hazard, index) => (
                      <li key={index} className="text-gray-700">{hazard}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Eco Fact */}
              <div className="bg-mint/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-forest mb-2">Did You Know?</h3>
                <p className="text-gray-700 italic">{item.fact}</p>
              </div>
              
              {/* Alternatives */}
              {item.alternatives && item.alternatives.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-forest mb-2">Eco-Friendly Alternatives</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {item.alternatives.map((alternative, index) => (
                      <li key={index} className="text-gray-700">{alternative}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WasteModal;