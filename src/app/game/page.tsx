"use client";

// Libraries
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Components
import PuzzleGrid from "@/components/PuzzleGrid";
import Image from "next/image";

// Utils
import { processImage } from "@/utils/imageProcessing";
import {
  EmptyPiece,
  isPuzzleSolved,
  movePiece,
  Piece,
  shufflePieces,
  initializePieces,
  isAdjacent,
  GRID_SIZE,
} from "@/utils/puzzle";

export default function Game() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timePlayed, setTimePlayed] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedImageUrl = searchParams.get("url");
  const [emptyPiece, setEmptyPiece] = useState<EmptyPiece>({
    x: GRID_SIZE - 1,
    y: GRID_SIZE - 1,
  });

  useEffect(() => {
    if (!encodedImageUrl) {
      router.push("/");
    } else {
      const url = decodeURIComponent(encodedImageUrl);
      setIsLoading(true);
      processImage(url)
        .then((processedImageUrl) => {
          setImageUrl(processedImageUrl);
          const newPieces = initializePieces(GRID_SIZE);
          const { shuffledPieces, newEmptyPiece } = shufflePieces({
            pieces: newPieces,
            emptyPiece: { x: GRID_SIZE - 1, y: GRID_SIZE - 1 },
            shuffleMoves: 2,
          });
          setPieces(shuffledPieces);
          setEmptyPiece(newEmptyPiece);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(
            "Failed to load or process the image. Please try another image."
          );
          setIsLoading(false);
        });
    }
  }, [encodedImageUrl, router, GRID_SIZE]);

  useEffect(() => {
    if (!isLoading && !solved) {
      const timer = setInterval(() => {
        setTimePlayed((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading, solved]);

  useEffect(() => {
    if (solved) {
      router.push(
        `/game-over?moves=${moveCount}&time=${timePlayed}&imageUrl=${encodeURIComponent(
          imageUrl || ""
        )}`
      );
    }
  }, [solved, moveCount, timePlayed, imageUrl, router]);

  const handlePieceClick = (clickedPiece: Piece) => {
    if (isAdjacent(clickedPiece, emptyPiece)) {
      setPieces((prevPieces) => {
        const newPieces = movePiece(prevPieces, clickedPiece, emptyPiece);
        if (isPuzzleSolved(newPieces)) {
          setSolved(true);
        }
        return newPieces;
      });

      setEmptyPiece({ x: clickedPiece.currentX, y: clickedPiece.currentY });
      setMoveCount((prevCount) => prevCount + 1);
    }
  };

  if (isLoading)
    return <div className="text-center py-4">Processing image...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!imageUrl) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
      <div className="flex justify-between w-full mb-4 text-sm sm:text-base">
        <div>Moves: {moveCount}</div>
        <div>
          Time: {Math.floor(timePlayed / 60)}:
          {(timePlayed % 60).toString().padStart(2, "0")}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
        <PuzzleGrid
          pieces={pieces}
          emptyPiece={emptyPiece}
          imageUrl={imageUrl}
          solved={solved}
          onPieceClick={handlePieceClick}
        />
        <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64">
          <Image
            width={500}
            height={500}
            src={imageUrl}
            alt="Puzzle Reference"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
