'use client'

import { motion } from 'framer-motion'
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useRouter } from 'next/navigation'
export default function HeroSection() {
  const router = useRouter()
  return (
  
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
      <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2" onClick={()=>router.push('/dashboard')} >
        Order Now.
      </button>
    </motion.div>
  </AuroraBackground>
  )
}

