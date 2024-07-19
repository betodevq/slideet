"use client";
// Libraries
import { FC } from "react";

// Context
import { Language, useLanguage } from "../contexts/LanguageContext";

const LanguageSelector: FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex space-x-4">
      <button
        aria-label="Select English"
        className={`p-2 border rounded ${
          language === "en" ? "bg-blue-500 text-white" : "bg-transparent"
        }`}
        onClick={() => handleLanguageChange("en")}
      >
        🇺🇸
      </button>
      <button
        aria-label="Select Spanish"
        className={`p-2 border rounded ${
          language === "es" ? "bg-blue-500 text-white" : "bg-transparent"
        }`}
        onClick={() => handleLanguageChange("es")}
      >
        🇪🇸
      </button>
    </div>
  );
};

export default LanguageSelector;
