import React, { useState } from 'react';

const captionOptions = [
  {
    "name": "Bright",
    "style": {
      "color": "#facc15",
      "fontWeight": "800",
      "textTransform": "uppercase",
      "letterSpacing": "0.05em",
      "textShadow": "2px 2px 4px rgba(0, 0, 0, 0.25)"
    }
  },
  {
    "name": "Superme",
    "style": {
      "color": "white",
      "fontWeight": "700",
      "fontStyle": "italic",
      "textShadow": "4px 4px 6px rgba(0, 0, 0, 0.25)"
    }
  },
  {
    "name": "Neon",
    "style": {
      "color": "#22c55e",
      "fontWeight": "800",
      "textTransform": "uppercase",
      "letterSpacing": "0.05em",
      "textShadow": "4px 4px 6px rgba(0, 0, 0, 0.25)"
    }
  },
  {
    "name": "Glitch",
    "style": {
      "color": "#ec4899",
      "fontWeight": "800",
      "textTransform": "uppercase",
      "letterSpacing": "0.05em",
      "textShadow": "4px 4px 0 rgba(0, 0, 0, 0.2)"
    }
  },
  {
    "name": "Fire",
    "style": {
      "color": "#ef4444",
      "fontWeight": "800",
      "textTransform": "uppercase"
    }
  },
  {
    "name": "Futuristic",
    "style": {
      "fontWeight": "700",
      "background": "linear-gradient(to right, #2dd4bf, #93c5fd)",
      "WebkitBackgroundClip": "text",
      "WebkitTextFillColor": "transparent",
      "textShadow": "2px 2px 4px rgba(0, 0, 0, 0.25)"
    }
  }
];

const Captions = ({ onHandleInputChange }) => {
  const [selectedCaptionStyle, setSelectedCaptionStyle] = useState(null);
  
  const handleSelectCaption = (option) => {
    setSelectedCaptionStyle(option.name);
    onHandleInputChange('caption', option);
  };

  return (
    <div className="bg-black/75 rounded-lg p-6 shadow-lg">
      <div className="mb-4">
        <h2 className="text-white text-xl font-bold mb-2">Caption Style</h2>
        <p className="text-slate-400 text-sm">Select caption style for your video</p>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {captionOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelectCaption(option)}
            className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200
              ${selectedCaptionStyle === option.name 
                ? 'bg-slate-700 border-2 border-teal-500 shadow-md shadow-teal-500/20' 
                : 'bg-slate-800 border border-slate-700 hover:bg-slate-700'}`}
          >
            <span style={option.style} className="text-center">
              {option.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Captions;