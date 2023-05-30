"use client";

import * as React from "react";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { ClipboardImage } from "@components/ClipboardImage";
import { ActionPanel } from "@components/ActionsPanel";
import { defaultSettings } from "@config/defaults";
import { cn } from "@utils/cn";
import { useSettings } from "@hooks/useSettings";
import { Settings } from "@components/settings/Settings";

import { LoadProvider } from "@components/providers/LoadProvider";
import { ToastProvider } from "@components/providers/ToastProvider";
import { TooltipProviders } from "@components/providers/TooltipProvider";

import { Button } from "@components/ui/Button";
import { Logo } from "@components/Logo";

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const {
    settings,
    setAspectRatio,
    setScale,
    setPositionX,
    setPositionY,
    setInsetColor,
    setInsetPadding,
    setBackgroundColor,
    setBackgroundImage,
  } = useSettings(defaultSettings);

  return (
    <LoadProvider>
      <ToastProvider>
        <TooltipProviders>
          <section className="flex h-screen w-screen items-center gap-2 p-5">
            <div className="grid h-fit w-full max-w-[1200px] place-items-center rounded-md p-9 shadow-3xl">
              <div
                ref={clipboardRef}
                style={settings.backgroundColor === "bg-transparent" && settings.backgroundImage ? {
                  backgroundImage: `url(${settings.backgroundImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                } : undefined}
                className={`${cn(
                  "max-w-6xl max-h-[648px] grid place-items-center p-[4%] overflow-hidden",
                  settings.aspectRatio,
                  settings.aspectRatio === "aspect-[3/4]" && "h-fit",
                  settings.aspectRatio === "aspect-square" && "h-fit",
                  settings.aspectRatio === "aspect-video" && "w-full",
                  settings.backgroundColor,
                )}`}
              >
                <ClipboardImage
                  insetColor={settings.insetColor}
                  scale={settings.scale}
                  positionX={settings.positionX}
                  positionY={settings.positionY}
                  insetPadding={settings.insetPadding}
                  setInsetColor={setInsetColor}
                  setInsetPadding={setInsetPadding}
                />
              </div>
            </div>
            <div className="flex h-full min-w-[324px] flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between gap-2 rounded-md bg-slate-900/90 p-5 py-3 text-slate-100 shadow-3xl">
                <header className="w-[150px] text-slate-200">
                  <Logo />
                </header>
                <Link href="https://usescreenshot.app/github" tabIndex={-1}>
                  <Button variant="ghost" className="px-2">
                    <GithubIcon className="h-6 w-6 stroke-[1.75px]" />
                  </Button>
                </Link>
              </div>
              <div className="flex h-full flex-col justify-between gap-y-4 overflow-y-scroll rounded-md bg-slate-900/90 p-5 pb-4 pt-3 text-slate-100 shadow-3xl [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:rounded-r-md [&::-webkit-scrollbar-track]:border [&::-webkit-scrollbar-track]:border-transparent [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar]:w-2.5">
                <Settings
                  settings={settings}
                  setAspectRatio={setAspectRatio}
                  setScale={setScale}
                  setPositionX={setPositionX}
                  setPositionY={setPositionY}
                  setInsetColor={setInsetColor}
                  setInsetPadding={setInsetPadding}
                  setBackgroundColor={setBackgroundColor}
                  setBackgroundImage={setBackgroundImage}
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
