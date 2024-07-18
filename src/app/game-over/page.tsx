"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Confetti from "react-confetti";

export default function GameOver() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const moves = searchParams.get("moves");
  const time = searchParams.get("time");
  const imageUrl = searchParams.get("imageUrl");

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    updateWindowSize();

    // Add event listener
    window.addEventListener("resize", updateWindowSize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
      />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-6">Congratulations!</h1>
        <p className="text-xl mb-4">
          You solved the puzzle in {moves} moves and{" "}
          {Math.floor(Number(time) / 60)}:
          {(Number(time) % 60).toString().padStart(2, "0")}!
        </p>
        {imageUrl && (
          <img
            src={decodeURIComponent(imageUrl)}
            alt="Completed Puzzle"
            className="w-64 h-64 object-cover mb-6"
          />
        )}
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Play Again
        </button>
      </div>
    </>
  );
}
