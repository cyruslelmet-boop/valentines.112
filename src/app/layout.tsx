import type { Metadata } from "next";
import "./globals.css";
import MusicPlayer from "../components/MusicPlayer";

export const metadata: Metadata = {
  title: "Valentines for Princess Neema — A Romantic Card Game",
  description:
    "Play a unique Valentine's card game for Princess Neema. Complete the collection to reveal a romantic proposal!",
  keywords: [
    "Valentine's card game",
    "romantic proposal game",
    "photo card challenge",
    "Valentine's Day surprise",
    "couples game",
    "valentine's day game",
    "proposal game",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
