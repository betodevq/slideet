// Libraries
import React from "react";
import clsx from "clsx";

// Utils
import {
  Piece,
  EmptyPiece,
  isAdjacent,
  PIECE_SIZE,
  CONTAINER_PX_SIZE,
} from "@/utils/puzzle";

interface PuzzlePieceProps {
  piece: Piece | undefined;
  isEmpty: boolean;
  emptyPiece: EmptyPiece;
  imageUrl: string;
  solved: boolean;
  onPieceClick: (piece: Piece) => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  piece,
  isEmpty,
  emptyPiece,
  imageUrl,
  solved,
  onPieceClick,
}) => {
  return (
    <div
      onClick={() => !solved && piece && onPieceClick(piece)}
      className={clsx(
        "border-white border flex items-center justify-center cursor-pointer",
        `w-[${PIECE_SIZE}px] h-[${PIECE_SIZE}px]`
      )}
      style={{
        cursor:
          piece && isAdjacent(piece, emptyPiece) && !solved
            ? "pointer"
            : "default",
        backgroundImage: isEmpty ? "none" : `url(${imageUrl})`,
        backgroundColor: isEmpty ? "salmon" : "transparent",
        backgroundSize: `${CONTAINER_PX_SIZE}px ${CONTAINER_PX_SIZE}px`,
        backgroundPosition: piece
          ? `${-piece.originalX * PIECE_SIZE}px ${
              -piece.originalY * PIECE_SIZE
            }px`
          : "0 0",
      }}
    />
  );
};

export default PuzzlePiece;
