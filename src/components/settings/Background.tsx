import { Check } from "lucide-react";
import { LabelTooltip } from "./LabelTooltip";
import { RadioGroup, RadioGroupItemCustom } from "@components/ui/RadioGroup";
import { Settings } from "@config/defaults";

const backgroundColors = [
  {
    name: "Indigo Pink",
    className:
      "bg-gradient-to-br from-indigo-700 from-10% via-purple-600 via-30% to-pink-600 to-90% saturate-[125%]",
  },
  {
    name: "Orange Hibiscus",
    className:
      "bg-gradient-to-br from-fuchsia-700 from-0% to-orange-600 to-100% saturate-[125%]",
  },
  {
    name: "Purple Blast",
    className:
      "bg-gradient-to-tl from-fuchsia-500 from-0% to-blue-500 to-100% saturate-[125%]",
  },
  {
    name: "Summer Breeze",
    className:
      "bg-gradient-to-br from-yellow-400 from-0% to-pink-500 to-100% saturate-[125%]",
  },
  {
    name: "Carribean Sea",
    className:
      "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% saturate-[125%]",
  },
  {
    name: "Rose Gold",
    className:
      "bg-gradient-to-tl from-rose-900 from-0% via-pink-500 via-50% to-rose-700 to-100% saturate-[125%]",
  },
  {
    name: "Intense Blues",
    className:
      "bg-gradient-to-br from-[#6e01e9] from-0% via-[#3358ff] via-45% to-[#022D9B] to-100% saturate-[125%]",
  },
];

export const Background = ({
  settings,
  setBackgroundColor,
}: {
  settings: Settings;
  setBackgroundColor: (v: Settings["backgroundColor"]) => void;
}) => {
  return (
    <div className="mt-3 space-y-3">
      <LabelTooltip tooltip="Quickly toggle using your arrow keys">
        Background
      </LabelTooltip>
      <RadioGroup
        aria-label="Background Colors"
        className="grid grid-cols-3 gap-2"
        value={settings.backgroundColor}
        onValueChange={(value: string) => setBackgroundColor(value)}
      >
        {backgroundColors.map(({ name, className }, key) => (
          <RadioGroupItemCustom
            key={key}
            aria-label={name}
            className={className}
            value={className}
          >
            <Check className="h-5 w-5" />
          </RadioGroupItemCustom>
        ))}
      </RadioGroup>
    </div>
  );
};
