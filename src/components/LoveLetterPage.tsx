"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function LoveLetterPage({ onNext }: { onNext: () => void }) {
  const letterContent = `My Dearest Princess Neema,

Words cannot express what you mean to me. Every moment with you is a treasure I'll cherish forever. You fill my life with love, joy, and endless possibilities.

This is just the beginning of our beautiful story together.

All my love,
Cyrus 💕`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row gap-8 max-w-4xl items-center justify-center"
      >
        {/* Letter */}
        <div className="flex-1 bg-white/90 rounded-lg shadow-2xl p-8 max-w-md">
          <div className={`text-4xl text-red-600 mb-4 ${playfairDisplay.className}`}>
            💌
          </div>
          <p className="text-gray-800 leading-8 whitespace-pre-wrap text-sm lg:text-base">
            {letterContent}
          </p>
        </div>

        {/* Photo placeholder */}
        <div className="flex-1 relative w-64 h-80 rounded-lg shadow-2xl overflow-hidden bg-gradient-to-br from-pink-300 to-red-300">
          <div className="w-full h-full flex items-center justify-center text-white text-center">
            <p>Add your couple photo here</p>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        onClick={onNext}
        className="mt-12 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
      >
        Continue 💕
      </motion.button>
    </div>
  );
}
