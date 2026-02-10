"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function FlowersPage({ onNext }: { onNext: () => void }) {
  const flowerCaptions = [
    "You make my heart race",
    "In your eyes, I found home",
    "You're my favorite person",
    "Every day with you is a gift",
  ];

  const flowers = ["🌹", "🌺", "🌸", "🌷"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-4xl lg:text-5xl text-red-600 mb-12 text-center ${playfairDisplay.className}`}
      >
        Flowers of Love 💐
      </motion.h1>

      {/* Flowers Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl">
        {flowers.map((flower, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Flower emoji */}
            <div className="text-8xl mb-4">{flower}</div>

            {/* Caption */}
            <p className="text-center text-gray-800 font-semibold text-sm px-4">
              {flowerCaptions[idx]}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={onNext}
        className="mt-12 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
      >
        Continue 💕
      </motion.button>
    </div>
  );
}
