"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLabels } from "@/hooks/useLabels";

const BackToMenuButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getLabel } = useLabels();

  if (pathname === "/") return null;

  const handleBackToMenu = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleBackToMenu}
      className="px-4 py-2 underline font-bold text-white rounded hover:scale-110 transition-colors"
    >
      {getLabel("backToMenu", "Back to Menu")}
    </button>
  );
};

export default BackToMenuButton;
