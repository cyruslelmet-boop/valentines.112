"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleUserGesture = () => {
      // allow autoplay after first user gesture
      if (!playing) {
        audio.play().catch(() => {});
        setPlaying(true);
      }
      window.removeEventListener("click", handleUserGesture);
    };

    window.addEventListener("click", handleUserGesture, { once: true });

    return () => window.removeEventListener("click", handleUserGesture);
  }, [playing]);

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
    <div className="fixed bottom-4 right-4 z-50 bg-white/80 dark:bg-black/60 rounded-md p-2 shadow-md">
      <audio ref={audioRef} src="/Lord_Huron_-_The_Night_We_Met__Official_Audio_(256k).mp3" loop />
      <button onClick={toggle} className="px-3 py-1 rounded text-sm">
        {playing ? "Pause Music" : "Play Music"}
      </button>
    </div>
  );
}
