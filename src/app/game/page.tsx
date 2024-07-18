"use client";

import { useState, useEffect, useCallback } from "react";
import { trpc } from "@/utils/trpc";
import clsx from "clsx";

export default function Game() {
  const [imageId, setImageId] = useState("0");
  const [pieces, setPieces] = useState<
    {
      id: number;
      currentX: number;
      currentY: number;
      originalX: number;
      originalY: number;
    }[]
  >([]);
  const [emptyPiece, setEmptyPiece] = useState({ x: 3, y: 3 });
  const [solved, setSolved] = useState(false);
  const gridSize = 4;
  const containerSize = 384;
  const pieceSize = containerSize / gridSize;

  const {
    data: imageUrl,
    isLoading,
    error,
  } = trpc.game.getImageUrl.useQuery({ imageId });

  const isPuzzleSolved = (
    pieces: {
      id: number;
      currentX: number;
      currentY: number;
      originalX: number;
      originalY: number;
    }[]
  ) => {
    return pieces.every(
      (piece) =>
        piece.currentX === piece.originalX && piece.currentY === piece.originalY
    );
  };

  const isAdjacent = useCallback(
    (
      piece: { currentX: number; currentY: number },
      emptyPiece: { x: number; y: number }
    ) => {
      return (
        Math.abs(piece.currentX - emptyPiece.x) +
          Math.abs(piece.currentY - emptyPiece.y) ===
        1
      );
    },
    []
  );

  const movePiece = ({
    prevPieces,
    clickedPiece,
    emptyPiece,
  }: {
    prevPieces: {
      id: number;
      currentX: number;
      currentY: number;
      originalX: number;
      originalY: number;
    }[];
    clickedPiece: {
      id: number;
      currentX: number;
      currentY: number;
      originalX: number;
      originalY: number;
    };
    emptyPiece: { x: number; y: number };
  }) => {
    return prevPieces.map((piece) =>
      piece.id === clickedPiece.id
        ? { ...piece, currentX: emptyPiece.x, currentY: emptyPiece.y }
        : piece
    );
  };

  const handlePieceClick = useCallback(
    (clickedPiece: {
      id: number;
      currentX: number;
      currentY: number;
      originalX: number;
      originalY: number;
    }) => {
      if (isAdjacent(clickedPiece, emptyPiece)) {
        setPieces((prevPieces) => {
          const newPieces = movePiece({ prevPieces, clickedPiece, emptyPiece });
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
    },
    [emptyPiece, isAdjacent, isPuzzleSolved]
  );

  useEffect(() => {
    if (imageUrl) {
      const newPieces = [];
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (x !== emptyPiece.x || y !== emptyPiece.y) {
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
      setPieces(newPieces);
    }
  }, [imageUrl, gridSize]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
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
