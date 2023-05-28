"use client";

import * as React from "react";
import { useOS } from "@hooks/useOS";
import { useTimeout } from "@hooks/useTimeout";
import { Logo } from "@components/Logo";
import { Loader } from "@components/Loader";

export const LoadProvider = ({ children }: { children: React.ReactNode }) => {
  const os = useOS();

  const [isReady, setIsReady] = React.useState(false);

  const timeout = useTimeout(() => setIsReady(true), 1000);
  timeout.call();

  if (os === "undetermined" || !isReady) {
    return (
      <div className="rounded-md shadow-3xl ring-8 ring-slate-900/50">
        <div className="rounded-md bg-[#020617] bg-[length:15px_15px] px-6 py-12 [background-image:radial-gradient(#64748b_0.75px,_transparent_0)] md:px-24 md:py-12 lg:px-32 lg:py-16">
          <header className="flex flex-col items-center gap-6 bg-[#020617] px-3 py-6 text-slate-200 md:px-12 md:py-9">
            <Logo />
            <Loader />
          </header>
        </div>
      </div>
    );
  }

  if (os === "android" || os === "ios") {
    return (
      <div className="rounded-md shadow-3xl ring-8 ring-slate-900/50">
        <div className="rounded-md bg-[#020617] bg-[length:15px_15px] px-6 py-12 [background-image:radial-gradient(#64748b_0.75px,_transparent_0)] md:px-24 md:py-12 lg:px-32 lg:py-16">
          <header className="flex flex-col items-center gap-4 bg-[#020617] px-3 py-6 text-slate-200 md:px-12 md:py-9">
            <Logo />
            <p className="text-center text-lg font-semibold leading-tight text-slate-200">
              Screenshot requires a bigger screen and doesn&apos;t support
              mobile view for now.
            </p>
          </header>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
