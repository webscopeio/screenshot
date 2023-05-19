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

const background = {
  light:
    "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
  dark: "bg-gradient-to-br from-indigo-700 from-10% via-purple-700 via-30% to-pink-700 to-90%",
};

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const {
    settings,
    setAspectRatio,
    setPadding,
    setInsetColor,
    setInsetPadding,
    setIsDark,
  } = useSettings(defaultSettings);

  return (
    <LoadProvider>
      <ToastProvider>
        <TooltipProviders>
          <section className="flex h-screen w-screen items-center gap-2 p-5">
            <div className="m-9 h-fit w-full rounded-md border-8 border-slate-900/50 shadow-3xl">
              <div className="grid w-full place-items-center bg-[#020617] bg-[length:15px_15px] p-12 [background-image:radial-gradient(#64748b_0.75px,_transparent_0)]">
                <div
                  ref={clipboardRef}
                  style={{
                    padding: `${settings.padding}%`,
                  }}
                  className={`${cn(
                    "max-w-6xl max-h-[648px] grid place-items-center",
                    settings.padding === 0 && "[&>img]:rounded-none",
                    settings.aspectRatio,
                    settings.aspectRatio === "aspect-video" && "w-full",
                    !settings.isDark ? background.light : background.dark
                  )}`}
                >
                  <ClipboardImage
                    insetColor={settings.insetColor}
                    insetPadding={settings.insetPadding}
                    setInsetColor={setInsetColor}
                    setInsetPadding={setInsetPadding}
                    setIsDark={setIsDark}
                  />
                </div>
              </div>
            </div>
            <div className="flex h-full min-w-[340px] flex-col justify-between rounded-md bg-slate-900 p-5 text-slate-100 shadow-3xl">
              <Settings
                settings={settings}
                setAspectRatio={setAspectRatio}
                setPadding={setPadding}
                setInsetColor={setInsetColor}
                setInsetPadding={setInsetPadding}
                setIsDark={setIsDark}
              />
              <ActionPanel clipboardRef={clipboardRef} />
            </div>
          </section>
        </TooltipProviders>
      </ToastProvider>
    </LoadProvider>
  );
}
