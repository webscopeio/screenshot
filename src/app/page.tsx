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
import { Slider } from "@components/Slider";
import { Input } from "@components/Input";

const SUPPORTED_ASPECT_RATIOS = {
  VIDEO: "aspect-video",
  AUTO: "aspect-auto",
} as const;

type AspectRatio =
  (typeof SUPPORTED_ASPECT_RATIOS)[keyof typeof SUPPORTED_ASPECT_RATIOS];

const BG_THEMES = {
  LIGHT:
    "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
  DARK: "bg-gradient-to-br from-indigo-700 from-10% via-purple-700 via-30% to-pink-700 to-90%",
} as const;

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const [aspectRatio, setAspectRatio] =
    React.useState<AspectRatio>("aspect-video");
  const [padding, setPadding] = React.useState(4);
  const [isDark, setIsDark] = React.useState(false);

  const [insetColor, setInsetColor] = React.useState("#000000");
  const [insetPadding, setInsetPadding] = React.useState(0);

  const clipboard = useImageRenderer();
  const download = useImageRenderer();

  console.log(padding);

  return (
    <section className="h-[648px] grid grid-cols-[1fr_auto] gap-6 w-full place-items-end">
      <div className="grid w-full place-items-center h-full">
        <div
          ref={clipboardRef}
          style={{
            padding: `${padding}%`,
          }}
          className={`${cn(
            "max-w-6xl max-h-[648px] grid place-items-center",
            aspectRatio,
            aspectRatio === "aspect-video" && "w-full",
            !isDark ? BG_THEMES.LIGHT : BG_THEMES.DARK
          )}`}
        >
          <ClipboardImage insetColor={insetColor} insetPadding={insetPadding} />
        </div>
      </div>
      <div className="gap-4 w-fit h-full flex flex-col justify-between border-l pl-6 min-w-[300px]">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="aspect-settings">Aspect Ratio</Label>
            <RadioGroup
              id="aspect-settings"
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
          <div>
            <Label htmlFor="padding">Padding</Label>
            <div className="flex gap-x-2 items-center">
              <Slider
                id="padding"
                onValueChange={(value) => setPadding(value[0])}
                value={[padding]}
                max={10}
                step={1}
              />
              <Input
                className="w-16"
                type="number"
                placeholder="4"
                min={0}
                max={10}
                value={padding}
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  value = value > 10 ? 10 : value;
                  value = value < 0 ? 0 : value;
                  setPadding(value);
                }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="inset">Inset padding</Label>
            <div className="flex flex-col space-y-2">
              <Input
                id="inset"
                type="color"
                value={insetColor}
                onChange={(e) => setInsetColor(e.target.value)}
              />
              <div className="flex gap-x-2 items-center">
                <Slider
                  onValueChange={(value) => setInsetPadding(value[0])}
                  value={[insetPadding]}
                  max={10}
                  step={1}
                />
                <Input
                  className="w-16"
                  type="number"
                  placeholder="4"
                  min={0}
                  max={10}
                  value={insetPadding}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    value = value > 10 ? 10 : value;
                    value = value < 0 ? 0 : value;
                    setInsetPadding(value);
                  }}
                />
              </div>
            </div>
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
