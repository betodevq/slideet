"use client";

import { useState, useEffect } from "react";
import {
  EmptyPiece,
  isPuzzleSolved,
  movePiece,
  Piece,
  shufflePieces,
  initializePieces,
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
            shuffleMoves: 100,
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

  const handlePieceClick = (clickedPiece: Piece) => {
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
  };

  if (isLoading) return <div>Processing image...</div>;
  if (error) return <div>{error}</div>;
  if (!imageUrl) return null;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Sliding Puzzle Game</h1>
      <PuzzleGrid
        gridSize={gridSize}
        containerSize={containerSize}
        pieces={pieces}
        emptyPiece={emptyPiece}
        imageUrl={imageUrl}
        solved={solved}
        onPieceClick={handlePieceClick}
      />
    </div>
  );
}
