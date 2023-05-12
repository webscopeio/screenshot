"use client";

import * as React from "react";
import { Clipboard, Download } from "lucide-react";

import { ClipboardImage } from "@components/ClipboardImage";
import { useImageRenderer } from "@hooks/useImageRenderer";
import { ActionButton } from "@components/ActionButton";
import { cn } from "@utils/cn";
import { RadioGroup, RadioGroupItem } from "@components/RadioGroup";
import { Label } from "@components/Label";
import { Switch } from "@components/Switch";

export const SUPPORTED_ASPECT_RATIOS = {
  VIDEO: "aspect-video",
  AUTO: "aspect-auto",
} as const;

export type AspectRatio =
  (typeof SUPPORTED_ASPECT_RATIOS)[keyof typeof SUPPORTED_ASPECT_RATIOS];

export const BG_THEMES = {
  LIGHT:
    "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
  DARK: "bg-gradient-to-br from-indigo-700 from-10% via-purple-700 via-30% to-pink-700 to-90%",
} as const;

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const [aspectRatio, setAspectRatio] =
    React.useState<AspectRatio>("aspect-video");
  const [isDark, setIsDark] = React.useState(false);
  const clipboard = useImageRenderer();
  const download = useImageRenderer();

  return (
    <section className="h-[648px] grid grid-cols-[1fr_auto] gap-6 w-full place-items-end">
      <div className="grid w-full place-items-center h-full">
        <div
          ref={clipboardRef}
          className={`${cn(
            "max-w-6xl max-h-[648px] grid place-items-center p-[2.5%]",
            aspectRatio,
            aspectRatio === "aspect-video" && "w-full",
            !isDark ? BG_THEMES.LIGHT : BG_THEMES.DARK
          )}`}
        >
          <ClipboardImage />
        </div>
      </div>
      <div className="gap-4 w-fit h-full flex flex-col justify-between border-l pl-6 min-w-[300px]">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-sm font-medium">Aspect Ratio</h2>
            <RadioGroup
              defaultValue="aspect-video"
              onValueChange={(value) => setAspectRatio(value as AspectRatio)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={SUPPORTED_ASPECT_RATIOS.VIDEO}
                  id={SUPPORTED_ASPECT_RATIOS.VIDEO}
                />
                <Label htmlFor={SUPPORTED_ASPECT_RATIOS.VIDEO}>16:9</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={SUPPORTED_ASPECT_RATIOS.AUTO}
                  id={SUPPORTED_ASPECT_RATIOS.AUTO}
                />
                <Label htmlFor={SUPPORTED_ASPECT_RATIOS.AUTO}>Auto</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-3">
            <Switch
              onCheckedChange={() => setIsDark(!isDark)}
              id="color-theme"
            />
            <Label htmlFor="color-theme">Dark mode</Label>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ActionButton
            variant="secondary"
            state={clipboard.state}
            onClick={() =>
              clipboardRef.current && clipboard.copy(clipboardRef.current)
            }
            icon={<Clipboard className="h-5 w-5 opacity-80" />}
          >
            Copy to Clipboard
          </ActionButton>
          <ActionButton
            state={download.state}
            onClick={() =>
              clipboardRef.current && download.download(clipboardRef.current)
            }
            icon={<Download className="h-5 w-5" />}
          >
            Download
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
