import { Check } from "lucide-react";
import { LabelTooltip } from "./LabelTooltip";
import { RadioGroup, RadioGroupItemCustom } from "@components/ui/RadioGroup";
import {
  AspectRatio as AspectRatioType,
  SUPPORTED_ASPECT_RATIOS,
  Settings,
} from "@config/defaults";
import { cn } from "@utils/cn";

const aspectRatios: { label: string; type: AspectRatioType }[] = [
  {
    label: "16:9",
    type: SUPPORTED_ASPECT_RATIOS.VIDEO,
  },
  {
    label: "3:4",
    type: SUPPORTED_ASPECT_RATIOS.PHONE_WIDE,
  },
  {
    label: "9:16",
    type: SUPPORTED_ASPECT_RATIOS.PHONE,
  },
  {
    label: "1:1",
    type: SUPPORTED_ASPECT_RATIOS.SQUARE,
  },
  {
    label: "Auto",
    type: SUPPORTED_ASPECT_RATIOS.AUTO,
  },
];

export const AspectRatio = ({
  settings,
  setAspectRatio,
}: {
  settings: Settings;
  setAspectRatio: (v: Settings["aspectRatio"]) => void;
}) => {
  return (
    <section className="mt-1 space-y-2">
      <LabelTooltip tooltip="Width and height ratio">Aspect Ratio</LabelTooltip>
      <RadioGroup
        aria-label="Aspect Ratios"
        className="grid grid-cols-3 gap-2"
        value={settings.aspectRatio}
        onValueChange={(value: string) =>
          setAspectRatio(value as AspectRatioType)
        }
      >
        {aspectRatios.map(({ label, type }) => (
          <RadioGroupItemCustom
            key={type}
            aria-label={type}
            className={"border border-slate-100/10 bg-transparent"}
            value={type}
          >
            <div
              className={cn(
                "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
                type,
                type === "aspect-auto" && "w-fit px-2"
              )}
            >
              <Check aria-hidden={true} className="h-3 w-3" />
            </div>
            <p className="text-xs font-semibold leading-[0] text-slate-200">
              {label}
            </p>
          </RadioGroupItemCustom>
        ))}
      </RadioGroup>
    </section>
  );
};
