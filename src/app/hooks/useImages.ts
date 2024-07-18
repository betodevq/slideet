import { useQuery } from "react-query";
import { trpc } from "../utils/trpc";

export const useImages = () => {
  return useQuery("images", () => trpc.useQuery(["getImages"]));
};
