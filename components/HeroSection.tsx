'use client'

import { motion } from 'framer-motion'
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';
export default function HeroSection() {
  const router = useRouter()
  const { isSignedIn } = useAuth();
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
      Track Board : Reliable, Durable, Unstoppable.
      </div>
      {isSignedIn
      ?
      <Button variant="outline" className="dark:text-white" onClick={()=>router.push('/dashboard')} >
      Track Order Now. 
      </Button>
      : <Button variant="outline" className="dark:text-white" onClick={()=>router.push('/sign-in')} >
      Join Now.
      </Button>
}
    </motion.div>
  </AuroraBackground>
  )
}

