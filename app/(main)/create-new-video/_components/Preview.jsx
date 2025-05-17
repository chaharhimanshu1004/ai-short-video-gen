import Image from 'next/image'
import React from 'react'
import { options } from './VideoStyle'

function Preview({ formData }) {
    const selectVideoStyle = formData && options.find((item => item?.name === formData?.videoStyle));

    if (!formData?.videoStyle) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] rounded-lg border border-dashed border-slate-700 bg-slate-800/30">
                <p className="text-gray-400 text-center px-4">
                    Select options on the left to preview your video
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Preview</h2>

            <div className="relative rounded-xl overflow-hidden bg-slate-800 shadow-xl">
                <Image
                    src={selectVideoStyle?.image}
                    alt={selectVideoStyle?.name}
                    width={1000}
                    height={300}
                    className="w-full h-[350px] object-cover"
                />

                {formData?.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <h2
                            className="text-center w-full"
                            style={formData?.caption?.style}
                        >
                            {formData?.caption?.name}
                        </h2>
                    </div>
                )}
            </div>

            {formData?.title && (
                <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <h3 className="font-medium text-sm text-gray-300">Project: {formData.title}</h3>
                </div>
            )}
        </div>
    )
}

export default Preview
