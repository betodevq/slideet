"use client";
//Libraries
import { FC } from "react";

// Components
import Image from "next/image";

interface ImageSelectionProps {
  images: { id: string; url: string }[];
  onImageSelect: (imageUrl: string) => void;
  getLabel: (key: string, fallback: string) => string;
}

const ImageSelection: FC<ImageSelectionProps> = ({
  images,
  onImageSelect,
  getLabel,
}) => {
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {getLabel("selectImage", "Select an image:")}
      </h2>
      <div className="flex flex-wrap md:flex-nowrap gap-6 justify-center">
        {images?.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageSelect(image.url)}
          >
            <Image
              src={image.url}
              alt={getLabel("puzzleImageAlt", "Puzzle image") + ` ${index + 1}`}
              width={500}
              loading="lazy"
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelection;
