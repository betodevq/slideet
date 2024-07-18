"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import clsx from "clsx";

interface Piece {
  id: number;
  currentX: number;
  currentY: number;
  originalX: number;
  originalY: number;
}

interface EmptyPiece {
  x: number;
  y: number;
}

// Check if the puzzle is solved
const isPuzzleSolved = (pieces: Piece[]) => {
  return pieces.every(
    (piece) =>
      piece.currentX === piece.originalX && piece.currentY === piece.originalY
  );
};

// Check if the clicked piece is adjacent to the empty piece
const isAdjacent = (
  piece: { currentX: number; currentY: number },
  emptyPiece: EmptyPiece
) => {
  return (
    Math.abs(piece.currentX - emptyPiece.x) +
      Math.abs(piece.currentY - emptyPiece.y) ===
    1
  );
};

// Move the clicked piece to the empty piece's position
const movePiece = (
  prevPieces: Piece[],
  clickedPiece: Piece,
  emptyPiece: EmptyPiece
): Piece[] => {
  return prevPieces.map((piece) =>
    piece.id === clickedPiece.id
      ? { ...piece, currentX: emptyPiece.x, currentY: emptyPiece.y }
      : piece
  );
};

// Shuffle the pieces to create a solvable puzzle
const shufflePieces = ({
  pieces,
  emptyPiece,
  shuffleMoves = 100,
}: {
  pieces: Piece[];
  emptyPiece: EmptyPiece;
  shuffleMoves?: number;
}) => {
  let tempPieces = [...pieces];
  let tempEmptyPiece = { ...emptyPiece };

  for (let i = 0; i < shuffleMoves; i++) {
    // Get adjacent pieces to the empty piece
    const adjacentPieces = tempPieces.filter((piece) =>
      isAdjacent(piece, tempEmptyPiece)
    );

    // Randomly select one of the adjacent pieces to move
    const pieceToMove =
      adjacentPieces[Math.floor(Math.random() * adjacentPieces.length)];

    // Move the selected piece to the empty piece's position
    tempPieces = movePiece(tempPieces, pieceToMove, tempEmptyPiece);
    tempEmptyPiece = { x: pieceToMove.currentX, y: pieceToMove.currentY };
  }

  return { shuffledPieces: tempPieces, newEmptyPiece: tempEmptyPiece };
};

export default function Game() {
  const [imageId, setImageId] = useState("1");
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [emptyPiece, setEmptyPiece] = useState<EmptyPiece>({ x: 3, y: 3 });
  const [solved, setSolved] = useState(false);
  const gridSize = 4;
  const containerSize = 384;
  const pieceSize = containerSize / gridSize;

  const {
    data: imageUrl,
    isLoading,
    error,
  } = trpc.game.getImageUrl.useQuery({ imageId });

  const handlePieceClick = (clickedPiece: Piece) => {
    if (isAdjacent(clickedPiece, emptyPiece)) {
      setPieces((prevPieces) => {
        const newPieces = movePiece(prevPieces, clickedPiece, emptyPiece);
        // Check if the puzzle is solved after the move
        setTimeout(() => {
          if (isPuzzleSolved(newPieces)) {
            setSolved(true);
            console.log("Congratulations! You solved the puzzle!");
          }
        }, 100);

        return newPieces;
      });

      setEmptyPiece({ x: clickedPiece.currentX, y: clickedPiece.currentY });
    }
  };

  useEffect(() => {
    // Initialize pieces in a solved state
    const newPieces: Piece[] = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Exclude the empty piece's initial position
        if (!(x === gridSize - 1 && y === gridSize - 1)) {
          newPieces.push({
            id: y * gridSize + x,
            currentX: x,
            currentY: y,
            originalX: x,
            originalY: y,
          });
        }
      }
    }

    // Shuffle pieces
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
        className={clsx(
          `grid grid-cols-4 grid-cols-${gridSize} gap-[2px] size-96 border-2 border-black`
        )}
      >
        {[...Array(gridSize)].map((_, y) =>
          [...Array(gridSize)].map((_, x) => {
            const piece = pieces.find(
              (p) => p.currentX === x && p.currentY === y
            );
            const isEmpty = x === emptyPiece.x && y === emptyPiece.y;

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => !solved && piece && handlePieceClick(piece)}
                className={clsx(
                  "border-white border flex items-center justify-center cursor-pointer",
                  `w-[${pieceSize}px] h-[${pieceSize}px]`
                )}
                style={{
                  cursor:
                    piece && isAdjacent(piece, emptyPiece) && !solved
                      ? "pointer"
                      : "default",
                  backgroundImage: isEmpty ? "none" : `url(${imageUrl})`,
                  backgroundColor: isEmpty ? "salmon" : "transparent",
                  backgroundSize: `${containerSize}px ${containerSize}px`,
                  backgroundPosition: piece
                    ? `${-piece.originalX * pieceSize}px ${
                        -piece.originalY * pieceSize
                      }px`
                    : "0 0",
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
