"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParamsProvider } from "@search-params/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchParamsProvider query={searchParams} router={router}>
        {children}
      </SearchParamsProvider>
    </QueryClientProvider>
  );
};
