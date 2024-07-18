import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const gameRouter = router({
  getImages: publicProcedure.query(async () => {
    // Fetch images from database or file system
    return [
      { id: "1", name: "Image 1" },
      { id: "2", name: "Image 2" },
      { id: "3", name: "Image 3" },
    ];
  }),
  getPuzzleData: publicProcedure
    .input(z.object({ imageId: z.string() }))
    .query(async ({ input }) => {
      // Generate puzzle data based on imageId
      return {
        image: `path/to/image/${input.imageId}.jpg`,
        initialState: [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 0],
        ],
      };
    }),
});
