import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react'

const voiceOptions = [
    {
        "value": "af_sarah",
        "name": "🇺🇸 Sarah (Female)"
    },
    {
        "value": "af_sky",
        "name": "🇺🇸 Sky (Female)"
    },
    {
        "value": "am_adam",
        "name": "🇺🇸 Adam (Male)"
    },
    {
        "value": "hf_alpha",
        "name": "🇮🇳 Alpha (Female)"
    },
    {
        "value": "hf_beta",
        "name": "🇮🇳 Beta (Female)"
    },
    {
        "value": "hm_omega",
        "name": "🇮🇳 Omega (Male)"
    },
    {
        "value": "hm_psi",
        "name": "🇮🇳 Psi (Male)"
    },
    {
        "value": "am_echo",
        "name": "🇺🇸 Echo (Male)"
    },
    {
        "value": "am_eric",
        "name": "🇺🇸 Eric (Male)"
    },
    {
        "value": "am_fenrir",
        "name": "🇺🇸 Fenrir (Male)"
    },
    {
        "value": "am_liam",
        "name": "🇺🇸 Liam (Male)"
    },
    {
        "value": "am_michael",
        "name": "🇺🇸 Michael (Male)"
    },
    {
        "value": "am_onyx",
        "name": "🇺🇸 Onyx (Male)"
    },
]

function Voice({ onHandleInputChange }) {
    const [selectedVoice, setSelectedVoice] = useState();
    
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold mb-2">Video Voice</h2>
                <p className="text-sm text-gray-400 mb-2">Select voice for your video</p>
            </div>
            
            <ScrollArea className="h-[250px] pr-4 rounded-lg border border-black bg-black/75">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                    {voiceOptions.map((voice, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg cursor-pointer transition-colors
                                ${voice.name === selectedVoice 
                                    ? 'bg-teal-600/20 border border-teal-500' 
                                    : 'bg-slate-800 border border-slate-700 hover:border-slate-500'}`}
                            onClick={() => {
                                setSelectedVoice(voice.name);
                                onHandleInputChange('voice', voice.value)
                            }}
                        >
                            <h3 className="font-medium">{voice.name}</h3>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default Voice
