'use client'

import { motion } from 'framer-motion'
import { AuroraBackground } from "@/components/ui/aurora-background";
export default function HeroSection() {
  return (
    // <section className="flex flex-col items-center justify-center h-[calc(100vh-96px)] text-center">
    //   <motion.h1
    //     initial={{ opacity: 0, y: -50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.8 }}
    //     className="text-5xl font-bold text-brown-800 mb-4"
    //   >
    //     Experience the Brown Switch
    //   </motion.h1>
    //   <motion.p
    //     initial={{ opacity: 0, y: 50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.8, delay: 0.2 }}
    //     className="text-xl text-brown-600 mb-8"
    //   >
    //     Smooth, tactile, and satisfying
    //   </motion.p>
    //   <motion.div
    //     animate={{
    //       scale: [1, 1.2, 1],
    //       rotate: [0, 360, 0],
    //     }}
    //     transition={{
    //       duration: 2,
    //       ease: "easeInOut",
    //       times: [0, 0.5, 1],
    //       repeat: Infinity,
    //       repeatDelay: 1
    //     }}
    //     className="w-32 h-32 bg-brown-400 rounded-full flex items-center justify-center"
    //   >
    //     <div className="w-24 h-24 bg-pink-200 rounded-full" />
    //   </motion.div>
    // </section>
    <AuroraBackground>
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
      Engineered for Precision, Built for Machines.
      </div>
      <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
      The Brown Switch: Reliable, Durable, Unstoppable.
      </div>
      <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        Order Now.
      </button>
    </motion.div>
  </AuroraBackground>
  )
}

