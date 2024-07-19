"use client";
// Libraries
import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import ImageSelection from "@/components/ImageSelection";

// Utils
import { trpc } from "@/utils/trpc";

// Hooks
import { useLabels } from "@/hooks/useLabels";

export default function Home() {
  const router = useRouter();
  const { getLabel, isLoading: labelsLoading } = useLabels();
  const {
    data: images,
    isLoading: imagesLoading,
    error,
    isFetching,
  } = trpc.game.getImages.useQuery(undefined, {
    staleTime: 1000 * 60 * 120,
    gcTime: 1000 * 60 * 120,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

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

  if (imagesLoading || labelsLoading)
    return <div>{getLabel("loadingImages", "Loading...")}</div>;
  if (error)
    return (
      <div>
        {getLabel("errorLoadingImages", "Error loading images:")}{" "}
        {error.message}
      </div>
    );

  return (
    <div className="flex flex-col justify-center">
      {isFetching && (
        <div>{getLabel("refreshingImageList", "Refreshing image list...")}</div>
      )}
      <ImageSelection
        images={images || []}
        onImageSelect={handleImageSelect}
        getLabel={getLabel}
      />

      <form onSubmit={handleCustomUrlSubmit} className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {getLabel("customUrlPrompt", "Or enter your custom image URL:")}
        </h2>
        <div>
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder={getLabel(
              "customUrlPlaceholder",
              "Enter custom image URL"
            )}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {getLabel("playWithCustomImage", "Play with Custom Image")}
        </button>
        <p className="text-xs mt-1">
          {getLabel(
            "imageSizeWarning",
            "* If your image is bigger than 500x500, we will cut it for you."
          )}
          <br />
          {getLabel(
            "imageQualityWarning",
            "** Quality may be affected if the image is too small."
          )}
        </p>
      </form>
    </div>
  );
}
