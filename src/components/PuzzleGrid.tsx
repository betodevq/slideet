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
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
      }}
      className={clsx(
        `grid grid-cols-4 grid-cols-${GRID_SIZE} gap-[2px] size-96 border-2 border-black`
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
