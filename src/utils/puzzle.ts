export interface Piece {
  id: number;
  currentX: number;
  currentY: number;
  originalX: number;
  originalY: number;
}

export interface EmptyPiece {
  x: number;
  y: number;
}

// Check if the puzzle is solved
export const isPuzzleSolved = (pieces: Piece[]) => {
  return pieces.every(
    (piece) =>
      piece.currentX === piece.originalX && piece.currentY === piece.originalY
  );
};

// Check if the clicked piece is adjacent to the empty piece
export const isAdjacent = (
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
export const movePiece = (
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
export const shufflePieces = ({
  pieces,
  emptyPiece,
  shuffleMoves = 100,
}: {
  pieces: Piece[];
  emptyPiece: EmptyPiece;
  shuffleMoves?: number;
}) => {
  const shuffle = () => {
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

    return { tempPieces, tempEmptyPiece };
  };

  let { tempPieces, tempEmptyPiece } = shuffle();

  // Check if the puzzle is solved after shuffling
  // If it is, shuffle again until it's not solved
  while (isPuzzleSolved(tempPieces)) {
    ({ tempPieces, tempEmptyPiece } = shuffle());
  }

  return { shuffledPieces: tempPieces, newEmptyPiece: tempEmptyPiece };
};

export const initializePieces = (gridSize: number): Piece[] => {
  const newPieces: Piece[] = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
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
  return newPieces;
};
