"use client";

// Libraries
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Components
import Confetti from "react-confetti";
import Image from "next/image";

// Hooks
import { useLabels } from "@/hooks/useLabels";

export default function GameOver() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { getLabel, isLoading } = useLabels();

  const moves = searchParams.get("moves") ?? "0";
  const time = searchParams.get("time") ?? "0";
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedImageUrl = sessionStorage.getItem("lastGameImage");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
      sessionStorage.removeItem("lastGameImage");
    }
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  if (isLoading) return <div>{getLabel("loading", "Loading...")}</div>;

  const formattedTime = `${Math.floor(Number(time) / 60)}:${(Number(time) % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
      />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-6">
          {getLabel("congratulations", "Congratulations!")}
        </h1>
        <p className="text-xl mb-4">
          {getLabel(
            "puzzleSolvedMessage",
            "You solved the puzzle in {moves} moves and {time}!"
          )
            .replace("{moves}", moves)
            .replace("{time}", formattedTime)}
        </p>
        {imageUrl && (
          <Image
            width={500}
            height={500}
            src={imageUrl}
            alt={getLabel("completedPuzzleAlt", "Completed Puzzle")}
            className="w-64 h-64 object-cover mb-6"
          />
        )}
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {getLabel("playAgain", "Play Again")}
        </button>
      </div>
    </>
  );
}
