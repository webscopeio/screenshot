import * as React from "react";
import { Check } from "lucide-react";
import { LabelTooltip } from "./LabelTooltip";
import { RadioGroup, RadioGroupItemCustom } from "@components/ui/RadioGroup";
import { Settings } from "@config/defaults";
import { cn } from "@utils/cn";

export const Upscale = ({
  settings,
  setUpscale,
}: {
  settings: Settings;
  setUpscale: (v: Settings["upscale"]) => void;
}) => {
  return (
    <div className="mt-1 space-y-3">
      <LabelTooltip htmlFor="resolution" tooltip="Export resolution scale">
        Upscale
      </LabelTooltip>
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
