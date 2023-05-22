"use client";

import * as React from "react";
import { ClipboardImage } from "@components/ClipboardImage";
import { ActionPanel } from "@components/ActionsPanel";
import { defaultSettings } from "@config/defaults";
import { cn } from "@utils/cn";
import { useSettings } from "@hooks/useSettings";
import { Settings } from "@components/Settings";

import { LoadProvider } from "@components/providers/LoadProvider";
import { ToastProvider } from "@components/providers/ToastProvider";
import { TooltipProviders } from "@components/providers/TooltipProvider";

import { GithubIcon } from "lucide-react";
import { Button } from "@components/ui/Button";
import Link from "next/link";
import { Logo } from "@components/Logo";

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const {
    settings,
    setAspectRatio,
    setPadding,
    setInsetColor,
    setInsetPadding,
    setBackgroundColor,
  } = useSettings(defaultSettings);

  return (
    <LoadProvider>
      <ToastProvider>
        <TooltipProviders>
          <section className="flex h-screen w-screen items-center gap-2 p-5">
            <div className="m-9 h-fit w-full rounded-md shadow-3xl ring-8 ring-slate-900/50">
              <div className="grid w-full place-items-center rounded-md bg-[#020617] bg-[length:15px_15px] p-12 [background-image:radial-gradient(#64748b_0.75px,_transparent_0)]">
                <div
                  ref={clipboardRef}
                  style={{
                    padding: `${settings.padding}%`,
                  }}
                  className={`${cn(
                    "max-w-6xl max-h-[648px] grid place-items-center",
                    settings.padding === 0 && "[&>img]:rounded-none",
                    settings.aspectRatio,
                    settings.aspectRatio === "aspect-[3/4]" && "h-fit",
                    settings.aspectRatio === "aspect-video" && "w-full",
                    settings.backgroundColor
                  )}`}
                >
                  <ClipboardImage
                    insetColor={settings.insetColor}
                    insetPadding={settings.insetPadding}
                    setInsetColor={setInsetColor}
                    setInsetPadding={setInsetPadding}
                  />
                </div>
              </div>
            </div>
            <div className="flex h-full min-w-[340px] flex-col justify-between gap-1">
              <div className="flex items-center justify-between gap-2 rounded-md bg-slate-900/90 p-5 py-3 text-slate-100 shadow-3xl">
                <header className="w-[150px] text-slate-200">
                  <Logo />
                </header>
                <Link href="https://github.com/ekqt/screenshot">
                  <Button variant="ghost" className="px-2">
                    <GithubIcon className="h-6 w-6 stroke-[1.75px]" />
                  </Button>
                </Link>
              </div>
              <div className="flex h-full flex-col justify-between overflow-scroll rounded-md bg-slate-900/90 p-5 pb-4 pt-3 text-slate-100 shadow-3xl">
                <Settings
                  settings={settings}
                  setAspectRatio={setAspectRatio}
                  setPadding={setPadding}
                  setInsetColor={setInsetColor}
                  setInsetPadding={setInsetPadding}
                  setBackgroundColor={setBackgroundColor}
                />
                <ActionPanel clipboardRef={clipboardRef} />
              </div>
            </div>
          </section>
        </TooltipProviders>
      </ToastProvider>
    </LoadProvider>
  );
}
