"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Autoplay on first user interaction (browsers require this)
    const handleUserGesture = () => {
      audio.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
      });
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
    };

    // Try to play immediately (most browsers allow if muted or on desktop)
    audio.play().catch(() => {
      // If autoplay fails, wait for user gesture
      window.addEventListener("click", handleUserGesture, { once: true });
      window.addEventListener("touchstart", handleUserGesture, { once: true });
      setPlaying(false);
    });

    return () => {
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg p-3 shadow-lg">
      <audio ref={audioRef} src="/Lord_Huron_-_The_Night_We_Met__Official_Audio_(256k).mp3" loop />
      <button
        onClick={toggle}
        className="px-4 py-2 rounded text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
      >
        {playing ? "🔊 Music On" : "🔇 Music Off"}
      </button>
    </div>
  );
}
