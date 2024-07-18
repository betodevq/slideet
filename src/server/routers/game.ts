import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const gameRouter = router({
  getImages: publicProcedure.query(() => {
    return [
      { id: "0", url: "/images/image0.jpeg" },
      { id: "1", url: "/images/image1.jpeg" },
      { id: "2", url: "/images/image2.jpeg" },
    ];
  }),
  getImageUrl: publicProcedure
    .input(z.object({ imageId: z.string() }))
    .query(({ input }) => {
      return `/images/image${input.imageId}.jpeg`;
    }),
});
