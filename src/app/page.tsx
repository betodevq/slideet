"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Sliding Puzzle Game
      </h1>

      <form onSubmit={handleCustomUrlSubmit} className="mb-8">
        <input
          type="url"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="Enter custom image URL"
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Play with Custom Image
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">
        Or select a pre-defined image:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images?.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageSelect(image.url)}
          >
            <img
              src={image.url}
              alt={`Puzzle image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
