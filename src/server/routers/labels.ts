// server/routers/labels.ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const labels = {
  en: {
    gameTitle: "Slideet",
    selectImage: "Select an image:",
    customUrlPrompt: "Or enter your custom image URL:",
    customUrlPlaceholder: "Enter custom image URL",
    playWithCustomImage: "Play with Custom Image",
    imageSizeWarning:
      "* If your image is bigger than 500x500, we will cut it for you.",
    imageQualityWarning:
      "** Quality may be affected if the image is too small.",
    loadingImages: "Loading images...",
    errorLoadingImages: "Error loading images: ",
    refreshingImages: "Refreshing image list...",
    congratulations: "Congratulations!",
    puzzleSolvedMessage: "You solved the puzzle in {moves} moves and {time}!",
    playAgain: "Play Again",
    processingImage: "Processing image...",
    errorProcessingImage:
      "Failed to load or process the image. Please try another image.",
    moves: "Moves:",
    time: "Time:",
  },
  es: {
    gameTitle: "Slideet",
    selectImage: "Selecciona una imagen:",
    customUrlPlaceholder: "Ingrese la URL de la imagen personalizada",
    customUrlPrompt: "O ingresa la URL de tu imagen personalizada:",
    playWithCustomImage: "Jugar con imagen personalizada",
    imageSizeWarning:
      "* Si tu imagen es más grande que 500x500, la recortaremos por ti.",
    imageQualityWarning:
      "** La calidad puede verse afectada si la imagen es demasiado pequeña.",
    loadingImages: "Cargando imágenes...",
    errorLoadingImages: "Error al cargar imágenes: ",
    refreshingImages: "Actualizando lista de imágenes...",
    congratulations: "¡Felicidades!",
    puzzleSolvedMessage:
      "¡Resolviste el rompecabezas en {moves} movimientos y {time}!",
    playAgain: "Jugar de nuevo",
    processingImage: "Procesando imagen...",
    errorProcessingImage:
      "Error al cargar o procesar la imagen. Por favor, intenta con otra imagen.",
    moves: "Movimientos:",
    time: "Tiempo:",
  },
};

export const labelsRouter = router({
  getGameLabels: publicProcedure
    .input(z.object({ language: z.enum(["en", "es"]) }))
    .query(({ input }) => {
      return labels[input.language];
    }),
});
