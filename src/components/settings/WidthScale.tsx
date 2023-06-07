import * as React from "react";
import { Check } from "lucide-react";
import { LabelTooltip } from "./LabelTooltip";
import { Input } from "@components/ui/Input";
import { RadioGroup, RadioGroupItemCustom } from "@components/ui/RadioGroup";
import { Settings } from "@config/defaults";
import { cn } from "@utils/cn";

export const WidthScale = ({
  settings,
  setWidth,
  setUpscale,
}: {
  settings: Settings;
  setWidth: (v: Settings["width"]) => void;
  setUpscale: (v: Settings["upscale"]) => void;
}) => {
  return (
    <div className="mt-1 space-y-3">
      <div className="flex items-center justify-between">
        <LabelTooltip
          htmlFor="resolution"
          tooltip="Export resolution scale based on base width (px)"
        >
          Width and Scale
        </LabelTooltip>
        <div className="flex items-center gap-1.5">
          <Input
            id="resolution"
            className="w-[72px]"
            type="number"
            placeholder="800"
            min={800}
            max={2560}
            value={settings.width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
          <span>px</span>
        </div>
      </div>
      <RadioGroup
        aria-label="Export Scale"
        className="grid grid-cols-3 gap-2"
        value={`${settings.upscale}`}
        onValueChange={(value: string) => setUpscale(value)}
      >
        <RadioGroupItemCustom
          aria-label="1x"
          className="border border-slate-100/10 bg-transparent"
          value="1"
        >
          <div
            className={cn(
              "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
              settings.aspectRatio,
              settings.aspectRatio === "aspect-auto" && "w-fit px-2"
            )}
          >
            <Check aria-hidden={true} className="h-3 w-3" />
          </div>
          <p className="text-xs font-semibold leading-[0] text-slate-200">1x</p>
        </RadioGroupItemCustom>
        <RadioGroupItemCustom
          aria-label="1.5x"
          className="border border-slate-100/10 bg-transparent"
          value="1.5"
        >
          <div
            className={cn(
              "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
              settings.aspectRatio,
              settings.aspectRatio === "aspect-auto" && "w-fit px-2"
            )}
          >
            <Check aria-hidden={true} className="h-3 w-3" />
          </div>
          <p className="text-xs font-semibold leading-[0] text-slate-200">
            1.5x
          </p>
        </RadioGroupItemCustom>
        <RadioGroupItemCustom
          aria-label="2x"
          className={"border border-slate-100/10 bg-transparent"}
          value="2"
        >
          <div
            className={cn(
              "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
              settings.aspectRatio,
              settings.aspectRatio === "aspect-auto" && "w-fit px-2"
            )}
          >
            <Check aria-hidden={true} className="h-3 w-3" />
          </div>
          <p className="text-xs font-semibold leading-[0] text-slate-200">2x</p>
        </RadioGroupItemCustom>
        <RadioGroupItemCustom
          aria-label="3x"
          className={"border border-slate-100/10 bg-transparent"}
          value="3"
        >
          <div
            className={cn(
              "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
              settings.aspectRatio,
              settings.aspectRatio === "aspect-auto" && "w-fit px-2"
            )}
          >
            <Check aria-hidden={true} className="h-3 w-3" />
          </div>
          <p className="text-xs font-semibold leading-[0] text-slate-200">3x</p>
        </RadioGroupItemCustom>
      </RadioGroup>
    </div>
  );
};
