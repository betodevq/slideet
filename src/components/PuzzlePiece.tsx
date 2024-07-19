"use client";
// Libraries
import { FC } from "react";
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

const PuzzlePiece: FC<PuzzlePieceProps> = ({
  piece,
  isEmpty,
  emptyPiece,
  imageUrl,
  solved,
  onPieceClick,
}) => {
  const isMovable = piece && isAdjacent(piece, emptyPiece) && !solved;

  return (
    <div
      onClick={() => isMovable && piece && onPieceClick(piece)}
      className={clsx(
        "border-white border flex items-center justify-center",
        `w-[${PIECE_SIZE}px] h-[${PIECE_SIZE}px]`,
        "transition  duration-200 ease-in-out",
        isMovable && "hover:scale-105 hover:z-10",
        isEmpty && "bg-gray-200"
      )}
      style={{
        cursor: isMovable ? "pointer" : "default",
        backgroundImage: isEmpty ? "none" : `url(${imageUrl})`,
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
