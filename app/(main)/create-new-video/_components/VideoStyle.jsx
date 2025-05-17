import Image from 'next/image'
import React, { useState } from 'react'

export const options = [
    {
        name: 'Realistic',
        image: '/realistic.png'
    },
    {
        name: 'Cinematic',
        image: '/cinematic.png'
    },
    {
        name: 'Cartoon',
        image: '/3d.png'
    },
    {
        name: 'Watercolor',
        image: '/watercolor.png'
    },
    {
        name: 'Cyberpunk',
        image: '/cyberpunk.png'
    },
    {
        name: 'GTA',
        image: '/gta.png'
    },
    {
        name: 'Anim',
        image: '/anim.png'
    }
]

function VideoStyle({ onHandleInputChange }) {
    const [selectedStyle, setSelectedStyle] = useState();
    
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold mb-2">Video Styles</h2>
                <p className="text-sm text-gray-400 mb-3">Select video style</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {options?.map((option, index) => (
                    <div 
                        className="relative group cursor-pointer transform transition-all duration-200 hover:scale-105"
                        key={index}
                        onClick={() => {
                            setSelectedStyle(option.name);
                            onHandleInputChange('videoStyle', option.name)
                        }}
                    >
                        <div className={`overflow-hidden rounded-xl ${option.name === selectedStyle ? 'ring-2 ring-teal-500' : ''}`}>
                            <Image 
                                src={option.image}
                                alt={option.name}
                                width={500}
                                height={120}
                                className={`object-cover w-full h-[100px] lg:h-[120px] xl:h-[160px] transition-transform duration-300 group-hover:scale-110`}
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-xl">
                            <h2 className="text-center text-white font-medium text-sm">{option.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoStyle