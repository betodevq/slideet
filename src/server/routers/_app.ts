import { router } from "../trpc";
import { labelsRouter } from "./labels";
import { gameRouter } from "./game";

export const appRouter = router({
  game: gameRouter,
  labels: labelsRouter,
});

export type AppRouter = typeof appRouter;
