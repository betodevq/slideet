import React from "react";
import { trpc } from "@/utils/trpc";

interface ImageSelectionProps {
  onImageSelect: (imageId: string) => void;
}

const ImageSelection: React.FC<ImageSelectionProps> = ({ onImageSelect }) => {
  const { data: images, isLoading, error } = trpc.game.getImages.useQuery();

  if (isLoading) return <div>Loading images...</div>;
  if (error) return <div>Error loading images: {error.message}</div>;

  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-2xl mb-4">Select an image for the puzzle</h2>
      <div className="grid grid-cols-3 gap-4">
        {images?.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageSelect(image.id)}
          >
            <img
              src={image.url}
              alt={`Puzzle image ${index + 1}`}
              className="w-48 h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelection;
