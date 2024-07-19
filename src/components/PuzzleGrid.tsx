"use client";
// Libraries
import { FC } from "react";
import clsx from "clsx";

// Components
import PuzzlePiece from "./PuzzlePiece";

// Utils
import { Piece, EmptyPiece, GRID_SIZE } from "@/utils/puzzle";

interface PuzzleGridProps {
  pieces: Piece[];
  emptyPiece: EmptyPiece;
  imageUrl: string;
  solved: boolean;
  onPieceClick: (piece: Piece) => void;
}

const PuzzleGrid: FC<PuzzleGridProps> = ({
  pieces,
  emptyPiece,
  imageUrl,
  solved,
  onPieceClick,
}) => {
  return (
    <div
      className={clsx(
        `grid gap-[2px] border-2 border-black p-1 grid-cols-${GRID_SIZE} size-96 transition-all duration-500 ease-in-out`,
        solved ? "scale-105" : "scale-100"
      )}
    >
      {[...Array(GRID_SIZE)].map((_, y) =>
        [...Array(GRID_SIZE)].map((_, x) => {
          const piece = pieces.find(
            (p) => p.currentX === x && p.currentY === y
          );
          const isEmpty = x === emptyPiece.x && y === emptyPiece.y;

          return (
            <PuzzlePiece
              key={`${x}-${y}`}
              piece={piece}
              isEmpty={isEmpty}
              emptyPiece={emptyPiece}
              imageUrl={imageUrl}
              solved={solved}
              onPieceClick={onPieceClick}
            />
          );
        })
      )}
    </div>
  );
};

export default PuzzleGrid;
