"use client";

import * as React from "react";
import { SearchParamsProvider } from "@search-params/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  // TODO: Utilize URL Search Params
  // https://github.com/vercel/next.js/issues/43691
  const [query, setQuery] = React.useState<string>("");

  return (
    <SearchParamsProvider
      query={query}
      router={{
        push: (href) => {
          setQuery(href);
        },
        replace: (href) => {
          setQuery(href);
        },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SearchParamsProvider>
  );
};
