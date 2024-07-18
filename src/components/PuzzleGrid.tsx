import React from "react";
import clsx from "clsx";
import { Piece, EmptyPiece, isAdjacent } from "@/utils/puzzle";
import PuzzlePiece from "./PuzzlePiece";

interface PuzzleGridProps {
  gridSize: number;
  containerSize: number;
  pieces: Piece[];
  emptyPiece: EmptyPiece;
  imageUrl: string;
  solved: boolean;
  onPieceClick: (piece: Piece) => void;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({
  gridSize,
  containerSize,
  pieces,
  emptyPiece,
  imageUrl,
  solved,
  onPieceClick,
}) => {
  const pieceSize = containerSize / gridSize;

  return (
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
            <PuzzlePiece
              key={`${x}-${y}`}
              piece={piece}
              isEmpty={isEmpty}
              emptyPiece={emptyPiece}
              imageUrl={imageUrl}
              pieceSize={pieceSize}
              containerSize={containerSize}
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
