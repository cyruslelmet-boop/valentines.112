import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// 36 images
const images = [
  "/game-photos/1.avif",
  "/game-photos/2.avif",
  "/game-photos/3.avif",
  "/game-photos/4.avif",
  "/game-photos/5.avif",
  "/game-photos/6.avif",
  "/game-photos/7.avif",
  "/game-photos/8.avif",
  "/game-photos/9.avif",
  "/game-photos/10.avif",
  "/game-photos/11.avif",
  "/game-photos/12.avif",
  "/game-photos/13.avif",
  "/game-photos/14.avif",
  "/game-photos/15.avif",
  "/game-photos/16.avif",
  "/game-photos/17.avif",
  "/game-photos/18.avif",
  "/game-photos/19.avif",
  "/game-photos/20.avif",
  "/game-photos/21.avif",
  "/game-photos/22.avif",
  "/game-photos/23.avif",
  "/game-photos/24.avif",
  "/game-photos/25.avif",
  "/game-photos/26.avif",
  "/game-photos/27.avif",
  "/game-photos/28.avif",
  "/game-photos/29.avif",
  "/game-photos/30.avif",
  "/game-photos/31.avif",
  "/game-photos/32.avif",
  "/game-photos/33.avif",
  "/game-photos/34.avif",
  "/game-photos/35.avif",
  "/game-photos/36.avif",
];

export default function ValentinesProposal({ name = "Princess Neema", onNext }: { name?: string; onNext?: () => void }) {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  useEffect(() => {
    if (step === 0) {
      // Only auto-advance from step 0 after 5 seconds
      const timer = setTimeout(() => {
        setStep(1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(2);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-pink-200 via-rose-200 to-red-200">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            transition={{ duration: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 rounded-3xl shadow-2xl p-12 text-center border-4 border-pink-300">
              {/* Love emojis scattered around */}
              <div className="absolute top-4 left-4 text-3xl opacity-70">💕</div>
              <div className="absolute top-4 right-4 text-3xl opacity-70">💖</div>
              <div className="absolute bottom-4 left-6 text-3xl opacity-70">💗</div>
              <div className="absolute bottom-4 right-6 text-3xl opacity-70">💝</div>
              <div className="absolute top-1/2 left-2 text-2xl opacity-50">💞</div>
              <div className="absolute top-1/2 right-2 text-2xl opacity-50">💘</div>
              
              <h2
                className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 mb-4 ${playfairDisplay.className}`}
              >
                I have a surprise for you, {name}! 💝
              </h2>
              <p className="text-lg text-gray-700 mb-6">Get ready for something special...</p>
              <div className="flex justify-center gap-2">
                <span className="text-3xl">💕</span>
                <span className="text-3xl">💖</span>
                <span className="text-3xl">💗</span>
              </div>
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="step-1"
            transition={{ duration: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center w-full"
          >
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2
              className={`text-5xl font-semibold mb-8 text-red-600 drop-shadow-lg ${playfairDisplay.className}`}
            >
              {name}, will you be my Valentine? 💕
            </h2>
            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
            />
            <div className="flex space-x-4 mt-10">
              <button
                className="px-8 py-3 text-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl"
                onClick={handleYesClick}
              >
                Yes, I will! 🥰
              </button>
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={
                  position
                    ? {
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                      }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            className={`text-4xl font-semibold mb-4 flex flex-col justify-center items-center text-red-600 drop-shadow-lg ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            OMG {name}, you said YES! 🥳
            <p className="text-sm mt-4 text-rose-700">For more information, write me!!! 💌</p>
            <Image
              src="/hamster_jumping.gif"
              alt="Hamster Feliz"
              width={200}
              height={200}
              unoptimized
            />
            {onNext && (
              <button
                onClick={onNext}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Continue 💕
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute w-full h-full">
          <Fireworks
            options={{
              autoresize: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
