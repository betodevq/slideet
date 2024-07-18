import { z } from "zod";
import { publicProcedure, router } from "../trpc";
export const gameRouter = router({
  getImages: publicProcedure.query(() => {
    return ["/public/image0.jpg"];
  }),
  getImageUrl: publicProcedure
    .input(
      z.object({
        imageId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { imageId } = input;
      return `/images/image${imageId}.jpeg`;
    }),
});
