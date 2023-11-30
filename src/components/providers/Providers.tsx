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
    <SearchParamsProvider
      query={searchParams.toString()}
      router={{
        push: (href) => router.push(href),
        replace: (href) => router.replace(href),
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SearchParamsProvider>
  );
};
