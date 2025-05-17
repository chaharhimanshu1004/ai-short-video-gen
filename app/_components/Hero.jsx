"use client"

import { Button } from "@/components/ui/button"
import Authentication from "./Authentication"
import { Sparkles, Play, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

function Hero() {
  return (
    <div className="px-6 md:px-10 pt-10 pb-24 flex flex-col items-center justify-center">
      {/* Headline with animated gradient text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 mr-2 text-teal-400" />
          <span className="text-sm font-medium text-gray-300">AI-Powered Video Creation</span>
        </div>

        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-amber-100 tracking-tight">
          AI Youtube Short <br className="hidden sm:block" />
          Video Generator
        </h1>

        <p className="mt-6 text-lg md:text-xl text-center text-gray-400 max-w-3xl mx-auto leading-relaxed">
          <span className="text-teal-400">🤖</span> AI generates scripts, images, and voiceovers in seconds.
          <br />
          <span className="text-amber-400">⚡</span> Create, edit, and publish engaging shorts with ease!
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 flex flex-col sm:flex-row gap-5 items-center"
      >
        <Authentication>
          <Button
            size="lg"
            className="h-14 px-8 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-0 rounded-xl shadow-lg shadow-teal-900/20"
          >
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Authentication>

      </motion.div>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {[
          { title: "AI Script Generation", description: "Generate engaging scripts with a single click" },
          { title: "Voice Synthesis", description: "Lifelike voiceovers in multiple languages and styles" },
          { title: "Auto Video Creation", description: "Combine visuals and audio into ready-to-publish shorts" },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4">
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Hero
