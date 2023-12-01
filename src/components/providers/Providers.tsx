"use client";

import * as React from "react";
import { SearchParamsProvider } from "@search-params/react";
import { useSearchParams, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <SearchParamsProvider query={searchParams} router={router}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SearchParamsProvider>
  );
};
