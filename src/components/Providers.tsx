"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { trpc, trpcClient } from "@/utils/trpc";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>{children}</LanguageProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
