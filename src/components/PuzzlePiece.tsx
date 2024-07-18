import React from "react";
import clsx from "clsx";
import { Piece, EmptyPiece, isAdjacent } from "@/utils/puzzle";

interface PuzzlePieceProps {
  piece: Piece | undefined;
  isEmpty: boolean;
  emptyPiece: EmptyPiece;
  imageUrl: string;
  pieceSize: number;
  containerSize: number;
  solved: boolean;
  onPieceClick: (piece: Piece) => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  piece,
  isEmpty,
  emptyPiece,
  imageUrl,
  pieceSize,
  containerSize,
  solved,
  onPieceClick,
}) => {
  return (
    <div
      onClick={() => !solved && piece && onPieceClick(piece)}
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
};

export default PuzzlePiece;
