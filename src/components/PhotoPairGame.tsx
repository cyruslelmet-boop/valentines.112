"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// 18 unique images
const baseImages = [
  "/game-photos/1.jpg",
  "/game-photos/2.jpg",
  "/game-photos/3.jpg",
  "/game-photos/4.jpg",
  "/game-photos/5.jpg",
  "/game-photos/6.jpg",
  "/game-photos/7.jpg",
  "/game-photos/8.jpg",
  "/game-photos/9.jpg",
  "/game-photos/10.jpg",
  "/game-photos/11.jpg",
  "/game-photos/12.jpg",
  "/game-photos/13.jpg",
  "/game-photos/14.jpg",
  "/game-photos/15.jpg",
  "/game-photos/16.jpg",
  "/game-photos/17.jpg",
  "/game-photos/18.jpg",
];

// Captions for each photo (edit these to be more personal)
const captions = [
  "Our first date",
  "That rainy afternoon",
  "Your laugh",
  "Sunset together",
  "Coffee at midnight",
  "Road trip memory",
  "The little victory",
  "Candlelight dinner",
  "That silly face",
  "A perfect hug",
  "Dancing in the kitchen",
  "Movie night",
  "Quiet morning",
  "The surprise picnic",
  "Holding hands",
  "Snowy walk",
  "Your smile",
  "Our future",
];

// Create 18 pairs of images (36 images in total)
const imagePairs = baseImages.flatMap((image) => [image, image]);

// Messages shown when specific images are matched (keyed by filename number)
const specialMessages: Record<string, string> = {
  "1": "Remember our first date? I cherish that day.",
  "5": "That coffee morning still makes me smile.",
  "12": "Movie nights with you are the best.",
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [shuffled] = useState(() => shuffleArray([...imagePairs]));

  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [specialMessage, setSpecialMessage] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [timerRunning]);

  const handleClick = async (index: number) => {
    if (selected.length === 2 || matched.includes(index) || selected.includes(index)) return;

    // Start timer on first interaction
    if (!timerRunning) setTimerRunning(true);

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setMoves((m) => m + 1);
      setSelected((prev) => [...prev, index]);

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        // Check for special message for this image
        const matchedSrc = shuffled[firstIndex];
        const match = matchedSrc.match(/\/(\d+)\./);
        if (match && specialMessages[match[1]]) {
          setSpecialMessage(specialMessages[match[1]]);
          setTimeout(() => setSpecialMessage(null), 3500);
        }
        setSelected([]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000); // Clear incorrect after 1 second
        setTimeout(() => setSelected([]), 1000);
      }
    } else {
      setSelected([index]);
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  return (
    <div className="grid grid-cols-9 gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center">
      {/* Image preload */}
      <div className="hidden">
        {shuffled.map((image, i) => (
          <Image
            key={i}
            src={image}
            alt={`Image ${i + 1}`}
            fill
            className="object-cover"
            priority
          />
        ))}
      </div>

      {/* HUD: timer & moves */}
      <div className="absolute top-4 left-4 z-40 text-white bg-black/40 px-3 py-1 rounded">
        <div>Time: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</div>
        <div>Moves: {moves}</div>
      </div>

      {/* Special match message */}
      {specialMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 text-black px-4 py-2 rounded shadow">
          {specialMessage}
        </div>
      )}

      {heartLayout.flat().map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className="w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleClick(index)}
            style={{ perspective: "1000px" }} // Add perspective for 3D effect
          >
            {/* Back of the card */}
            {!selected.includes(index) && !matched.includes(index) && (
              <motion.div
                className="w-full h-full bg-gray-300 rounded-sm lg:rounded-md absolute z-10"
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    selected.includes(index) || matched.includes(index)
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              />
            )}

            {/* Front of the card (image) */}
            {(selected.includes(index) || matched.includes(index)) && (
              <motion.div
                className="w-full h-full absolute"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={shuffled[index]}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="rounded-sm lg:rounded-md object-cover"
                />

                {/* Caption overlay for revealed card */}
                <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs py-1 text-center">
                  {(() => {
                    const src = shuffled[index];
                    const m = src.match(/\/(\d+)\./);
                    if (m) {
                      const n = parseInt(m[1], 10);
                      return captions[n - 1] || "";
                    }
                    return "";
                  })()}
                </div>
              </motion.div>
            )}

            {/* Incorrect animation */}
            {incorrect.includes(index) && (
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-red-500 rounded-sm lg:rounded-md"></div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div key={i} className="w-[11vh] h-[11vh] lg:w-20 lg:h-20" />
        ),
      )}
    </div>
  );
}
