"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function LoveLetterPage({ onNext }: { onNext: () => void }) {
  const letterContent = `My love,

i just wanted to remind you how much you mean to me. Everyday with you feels warmer, brighter, and a little more magical.

Thank you for the laughs, the late nights, and the quiet moments in between. I love you soo much`;

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

        {/* Couple Photo */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/couple-photo.jpg"
            alt="Us"
            width={300}
            height={400}
            className="rounded-lg shadow-2xl object-cover"
            priority
          />
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
