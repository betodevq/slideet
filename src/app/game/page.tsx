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
  const gridSize = 4;
  const containerSize = 384;
  const pieceSize = containerSize / gridSize;

  const {
    data: imageUrl,
    isLoading,
    error,
  } = trpc.game.getImageUrl.useQuery({ imageId });

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

  const handlePieceClick = useCallback(
    (clickedPiece: {
      id: number;
      currentX: number;
      currentY: number;
      originalX: number;
      originalY: number;
    }) => {
      if (isAdjacent(clickedPiece, emptyPiece)) {
        setPieces((prevPieces) =>
          prevPieces.map((piece) =>
            piece.id === clickedPiece.id
              ? { ...piece, currentX: emptyPiece.x, currentY: emptyPiece.y }
              : piece
          )
        );
        setEmptyPiece({ x: clickedPiece.currentX, y: clickedPiece.currentY });
      }
    },
    [emptyPiece, isAdjacent]
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
  }, [imageUrl, gridSize, emptyPiece.x, emptyPiece.y]);

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
        {[...Array(gridSize)].map((_, x) =>
          [...Array(gridSize)].map((_, y) => {
            const piece = pieces.find(
              (p) => p.currentX === x && p.currentY === y
            );
            const isEmpty = x === emptyPiece.x && y === emptyPiece.y;

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => piece && handlePieceClick(piece)}
                className={clsx(
                  "border-white border flex items-center justify-center cursor-pointer",
                  `w-[${pieceSize}px] h-[${pieceSize}px]`
                )}
                style={{
                  cursor:
                    piece && isAdjacent(piece, emptyPiece)
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
