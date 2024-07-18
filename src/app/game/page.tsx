"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import {
  EmptyPiece,
  isPuzzleSolved,
  movePiece,
  Piece,
  shufflePieces,
  initializePieces,
} from "@/utils/puzzle";
import PuzzleGrid from "@/components/PuzzleGrid";

const gridSize = 4;
const containerSize = 384;

export default function Game() {
  const [imageId, setImageId] = useState("1");
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [emptyPiece, setEmptyPiece] = useState({
    x: gridSize - 1,
    y: gridSize - 1,
  });
  const [solved, setSolved] = useState(false);

  const {
    data: imageUrl,
    isLoading,
    error,
  } = trpc.game.getImageUrl.useQuery({ imageId });

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

  useEffect(() => {
    const newPieces = initializePieces(gridSize);
    const { shuffledPieces, newEmptyPiece } = shufflePieces({
      pieces: newPieces,
      emptyPiece,
      shuffleMoves: 2,
    });
    setPieces(shuffledPieces);
    setEmptyPiece(newEmptyPiece);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1>Sliding Puzzle Game</h1>
      <PuzzleGrid
        gridSize={gridSize}
        containerSize={containerSize}
        pieces={pieces}
        emptyPiece={emptyPiece}
        imageUrl={imageUrl || ""}
        solved={solved}
        onPieceClick={handlePieceClick}
      />
    </div>
  );
}
