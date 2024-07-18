"use client";

import { useState, useEffect } from "react";
import {
  EmptyPiece,
  isPuzzleSolved,
  movePiece,
  Piece,
  shufflePieces,
  initializePieces,
  isAdjacent,
} from "@/utils/puzzle";
import { processImage } from "@/utils/imageProcessing";
import PuzzleGrid from "@/components/PuzzleGrid";
import { useSearchParams, useRouter } from "next/navigation";

export default function Game() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const encodedImageUrl = searchParams.get("url");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const gridSize = 4;
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [emptyPiece, setEmptyPiece] = useState<EmptyPiece>({
    x: gridSize - 1,
    y: gridSize - 1,
  });
  const [solved, setSolved] = useState(false);
  const containerSize = 500;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [moveCount, setMoveCount] = useState(0);

  const [timePlayed, setTimePlayed] = useState(0);

  useEffect(() => {
    if (!encodedImageUrl) {
      router.push("/");
    } else {
      const url = decodeURIComponent(encodedImageUrl);
      setIsLoading(true);
      processImage(url)
        .then((processedImageUrl) => {
          setImageUrl(processedImageUrl);
          const newPieces = initializePieces(gridSize);
          const { shuffledPieces, newEmptyPiece } = shufflePieces({
            pieces: newPieces,
            emptyPiece: { x: gridSize - 1, y: gridSize - 1 },
            shuffleMoves: 2,
          });
          setPieces(shuffledPieces);
          setEmptyPiece(newEmptyPiece);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(
            "Failed to load or process the image. Please try another image."
          );
          setIsLoading(false);
        });
    }
  }, [encodedImageUrl, router, gridSize]);

  useEffect(() => {
    if (!isLoading && !solved) {
      const timer = setInterval(() => {
        setTimePlayed((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading, solved]);

  const handlePieceClick = (clickedPiece: Piece) => {
    if (isAdjacent(clickedPiece, emptyPiece)) {
      setPieces((prevPieces) => {
        const newPieces = movePiece(prevPieces, clickedPiece, emptyPiece);
        setTimeout(() => {
          if (isPuzzleSolved(newPieces)) {
            setSolved(true);
            console.log("Congratulations! You solved the puzzle!");
          }
        }, 100);

        return newPieces;
      });

      setEmptyPiece({ x: clickedPiece.currentX, y: clickedPiece.currentY });
      // Increment move count
      setMoveCount((prevCount) => prevCount + 1);
    }
  };

  if (isLoading) return <div>Processing image...</div>;
  if (error) return <div>{error}</div>;
  if (!imageUrl) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <div>Moves: {moveCount}</div>
        <div>
          Time: {Math.floor(timePlayed / 60)}:
          {(timePlayed % 60).toString().padStart(2, "0")}
        </div>
      </div>
      <div className="flex gap-8">
        <PuzzleGrid
          gridSize={gridSize}
          containerSize={containerSize}
          pieces={pieces}
          emptyPiece={emptyPiece}
          imageUrl={imageUrl}
          solved={solved}
          onPieceClick={handlePieceClick}
        />
        <div className="w-64 h-64">
          <img
            src={imageUrl}
            alt="Puzzle Reference"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
