/**
 * Resizes an image to fit within a 500x500 canvas, maintaining its aspect ratio.
 * If the image is already 500x500, returns the original URL.
 * Otherwise, returns a data URL of the resized image in JPEG format.
 *
 * @param {string} url - The URL of the image to process.
 * @returns {Promise<string>} A promise that resolves with the original or resized image URL.
 */
export const processImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (img.width === 500 && img.height === 500) {
        resolve(url);
      } else {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 500;
        canvas.height = 500;

        if (!ctx) {
          reject(new Error("Unable to get canvas context"));
          return;
        }

        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        resolve(canvas.toDataURL("image/jpeg"));
      }
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
};
