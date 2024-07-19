// Libraries
import { useEffect, useState } from "react";

// Contexts
import { useLanguage } from "@/contexts/LanguageContext";

// Utils
import { trpc } from "@/utils/trpc";

export function useLabels() {
  const { language } = useLanguage();
  const { data, isLoading, error } = trpc.labels.getGameLabels.useQuery(
    { language },
    {
      staleTime: 1000 * 60 * 120,
      gcTime: 1000 * 60 * 120,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const [labels, setLabels] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data) {
      setLabels(data);
    }
  }, [data]);

  const getLabel = (key: string, fallback: string = "") => {
    return labels?.[key] || fallback;
  };

  return { getLabel, isLoading, error };
}
