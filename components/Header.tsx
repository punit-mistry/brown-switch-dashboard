'use client';

import { motion } from 'framer-motion';
import { ModeToggle } from '@/components/theme-toggle';
import {UserButton, SignInButton } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
export default function Header() {
    const { isSignedIn } = useAuth();
  return (
    <header className="p-4">
      <nav className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="w-8 h-8 bg-brown-400 rounded-full mr-2"></div>
          <span className="text-xl font-bold text-brown-800">Dashboard</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pr-4"
        >
          <div className="flex items-center gap-3">
            <ModeToggle />
            {isSignedIn ? <UserButton /> : <SignInButton  forceRedirectUrl={'/order'} />}
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
