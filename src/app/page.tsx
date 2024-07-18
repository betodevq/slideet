"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { data: images, isLoading, error } = trpc.game.getImages.useQuery();
  const [customUrl, setCustomUrl] = useState("");

  const handleImageSelect = (imageUrl: string) => {
    const encodedUrl = encodeURIComponent(imageUrl);
    router.push(`/game?url=${encodedUrl}`);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customUrl) {
      handleImageSelect(customUrl);
    }
  };

  if (isLoading) return <div>Loading images...</div>;
  if (error) return <div>Error loading images: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Select an image:</h2>
      <div className=" flex-wrap md:flex-nowrap flex gap-6 justify-center">
        {images?.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageSelect(image.url)}
          >
            <Image
              src={image.url}
              alt={`Puzzle image ${index + 1}`}
              width={500}
              height={500}
              className=" rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleCustomUrlSubmit} className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Or enter your custom image URL:
        </h2>
        <div>
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Enter custom image URL"
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Play with Custom Image
        </button>
        <p className="text-xs mt-1">
          * If your image is bigger than 500x500, we will cut it for you.
          <br />
          ** Quality may be affected if the image is too small.
        </p>
      </form>
    </div>
  );
}
