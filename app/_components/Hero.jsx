"use client"

import { Button } from "@/components/ui/button"
import Authentication from "./authentication"
import { Sparkles, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"

function Hero() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="relative px-6 md:px-10 pt-10 pb-24 flex flex-col items-center justify-center min-h-[90vh]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 opacity-50" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10%] opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-400 via-transparent to-transparent blur-3xl" />
        </div>
      </div>

      {/* Headline with animated gradient text */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="text-center relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 mb-8 rounded-full border border-teal-800/50 bg-teal-900/20 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 mr-2 text-teal-400" />
          <span className="text-sm font-medium text-teal-100">AI-Powered Video Creation</span>
        </motion.div>

        <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-cyan-200 tracking-tight leading-tight">
          AI Youtube Short <br className="hidden sm:block" />
          Video Generator
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-center text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="text-teal-400 font-semibold">🤖</span> AI generates scripts, images, and voiceovers in seconds.
          <br />
          <span className="text-cyan-400 font-semibold">⚡</span> Create, edit, and publish engaging shorts with ease!
        </motion.p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 flex flex-col sm:flex-row gap-5 items-center relative z-10"
      >
        <Authentication>
          <Button
            size="lg"
            className="h-14 px-8 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-0 rounded-xl shadow-lg shadow-teal-900/20 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Authentication>
      </motion.div>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl relative z-10"
      >
        {[
          { title: "AI Script Generation", description: "Generate engaging scripts with a single click", delay: 0 },
          { title: "Voice Synthesis", description: "Lifelike voiceovers in multiple languages and styles", delay: 0.1 },
          { title: "Auto Video Creation", description: "Combine visuals and audio into ready-to-publish shorts", delay: 0.2 },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + feature.delay }}
            className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-700/50 hover:border-teal-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/10 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-5 shadow-lg shadow-teal-900/20 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">{feature.title}</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Hero
