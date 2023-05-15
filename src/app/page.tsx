"use client";

import * as React from "react";
import { ClipboardImage } from "@components/ClipboardImage";
import { ActionPanel } from "@components/ActionsPanel";
import { defaultSettings } from "@config/defaults";
import { cn } from "@utils/cn";
import { useSettings } from "@hooks/useSettings";
import { Settings } from "@components/Settings";

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
    <section className="grid grid-cols-[1fr_auto] w-full max-w-[90rem] place-items-end border-8 rounded-md border-slate-900/50 ">
      <div className="grid w-full place-items-center h-full bg-[#020617] bg-[length:15px_15px] [background-image:radial-gradient(#64748b_0.75px,_transparent_0)] p-12">
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
      <div className="gap-4 w-fit h-full flex flex-col justify-between p-6 min-w-[300px] bg-slate-900 text-slate-100 relative">
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
  );
}
