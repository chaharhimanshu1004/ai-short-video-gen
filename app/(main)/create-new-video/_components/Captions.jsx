import React, { useState } from 'react'
const options = [

    {
        "name": "Youtuber",
        "style": {
            "color": "#facc15",
            "fontSize": "1.875rem",
            "fontWeight": "800",
            "textTransform": "uppercase",
            "letterSpacing": "0.05em",
            "textShadow": "2px 2px 4px rgba(0, 0, 0, 0.25)",
            "padding": "0.25rem 0.75rem",
            "borderRadius": "0.5rem"
        }
    },
    {
        "name": "Superme",
        "style": {
            "color": "white",
            "fontSize": "1.875rem",
            "fontWeight": "700",
            "fontStyle": "italic",
            "textShadow": "4px 4px 6px rgba(0, 0, 0, 0.25)",
            "padding": "0.25rem 0.75rem",
            "borderRadius": "0.5rem"
        }
    },
    {
        "name": "Neon",
        "style": {
            "color": "#22c55e",
            "fontSize": "1.875rem",
            "fontWeight": "800",
            "textTransform": "uppercase",
            "letterSpacing": "0.05em",
            "textShadow": "4px 4px 6px rgba(0, 0, 0, 0.25)",
            "padding": "0.25rem 0.75rem",
            "borderRadius": "0.5rem"
        }
    },
    {
        "name": "Glitch",
        "style": {
            "color": "#ec4899",
            "fontSize": "1.875rem",
            "fontWeight": "800",
            "textTransform": "uppercase",
            "letterSpacing": "0.05em",
            "textShadow": "4px 4px 0 rgba(0, 0, 0, 0.2)",
            "padding": "0.25rem 0.75rem",
            "borderRadius": "0.5rem"
        }
    },
    {
        "name": "Fire",
        "style": {
            "color": "#ef4444",
            "fontSize": "1.875rem",
            "fontWeight": "800",
            "textTransform": "uppercase",
            "padding": "0.25rem 0.75rem",
            "borderRadius": "0.5rem"
        }
    },
    {
        "name": "Futuristic",
        "style": {
            "fontSize": "1.875rem",
            "fontWeight": "700",
            "background": "linear-gradient(to right, #2dd4bf, #93c5fd)",
            "WebkitBackgroundClip": "text",
            "WebkitTextFillColor": "transparent",
            "textShadow": "2px 2px 4px rgba(0, 0, 0, 0.25)"
        }
    },
]

function Captions({ onHandleInputChange }) {
    const [selectedCaptionStyle, setSelectedCaptionStyle] = useState();
    
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold mb-2">Caption Style</h2>
                <p className="text-sm text-gray-400 mb-3">Select caption style</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {options.map((option, index) => (
                    <div 
                        key={index}
                        onClick={() => {
                            setSelectedCaptionStyle(option.name)
                            onHandleInputChange('caption', option)
                        }}
                        className={`p-3 bg-slate-800 hover:bg-slate-700 transition-colors
                            border cursor-pointer rounded-lg flex items-center justify-center
                            ${selectedCaptionStyle === option.name ? 'border-teal-500 shadow-lg shadow-teal-500/10' : 'border-slate-700'}`}
                    >
                        <h2 style={option.style}>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Captions