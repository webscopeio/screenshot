import { Check } from "lucide-react";
import { LabelTooltip } from "./LabelTooltip";
import { RadioGroup, RadioGroupItemCustom } from "@components/ui/RadioGroup";
import { Settings, defaultSettings } from "@config/defaults";
import { Checkbox } from "@components/ui/Checkbox";

const backgroundColors = [
  {
    name: "Violet Mesh",
    className:
      "bg-[hsla(289,74%,35%,1)] [background-image:radial-gradient(at_91%_72%,hsla(262,97%,60%,1)_0px,_transparent_50%),radial-gradient(at_83%_5%,hsla(255,85%,77%,1)_0px,_transparent_50%),radial-gradient(at_90%_37%,hsla(256,98%,74%,1)_0px,_transparent_50%),radial-gradient(at_59%_90%,hsla(264,94%,66%,1)_0px,_transparent_50%),radial-gradient(at_10%_40%,hsla(247,92%,70%,1)_0px,_transparent_50%),radial-gradient(at_25%_62%,hsla(319,96%,65%,1)_0px,_transparent_50%)]",
  },
  {
    name: "Ocean Mesh",
    className:
      "bg-[hsla(203,100%,68%,1)] [background-image:radial-gradient(at_65%_26%,hsla(192,100%,57%,1)_0px,_transparent_50%),radial-gradient(at_86%_44%,hsla(59,65%,60%,1)_0px,_transparent_50%),radial-gradient(at_47%_52%,hsla(269,60%,70%,1)_0px,_transparent_50%),radial-gradient(at_86%_88%,hsla(190,86%,62%,1)_0px,_transparent_50%),radial-gradient(at_83%_1%,hsla(223,93%,70%,1)_0px,_transparent_50%),radial-gradient(at_46%_6%,hsla(236,66%,62%,1)_0px,_transparent_50%)]",
  },
  {
    name: "Candy Mesh",
    className:
      "bg-[hsla(0,100%,50%,1)] [background-image:radial-gradient(at_40%_20%,hsla(28,100%,74%,1)_0px,_transparent_50%),radial-gradient(at_80%_0%,hsla(189,100%,56%,1)_0px,_transparent_50%),radial-gradient(at_0%_50%,hsla(355,100%,93%,1)_0px,_transparent_50%),radial-gradient(at_80%_50%,hsla(340,100%,76%,1)_0px,_transparent_50%),radial-gradient(at_0%_100%,hsla(22,100%,77%,1)_0px,_transparent_50%),radial-gradient(at_80%_100%,hsla(242,100%,70%,1)_0px,_transparent_50%),radial-gradient(at_0%_0%,hsla(343,100%,76%,1)_0px,_transparent_50%)]",
  },
  {
    name: "Blue Mesh",
    className:
      "bg-[#a399ff] [background-image:radial-gradient(at_12%_8%,_hsla(270,85%,60%,1)_0px,_transparent_50%),radial-gradient(at_22%_39%,hsla(211,62%,64%,1)_0px,_transparent_50%),radial-gradient(at_77%_64%,hsla(151,60%,79%,1)_0px,_transparent_50%),radial-gradient(at_87%_0%,hsla(231,70%,72%,1)_0px,_transparent_50%),radial-gradient(at_51%_54%,hsla(327,96%,79%,1)_0px,_transparent_50%),radial-gradient(at_48%_32%,hsla(358,83%,72%,1)_0px,_transparent_50%),radial-gradient(at_78%_8%,hsla(173,75%,75%,1)_0px,_transparent_50%)]",
  },
  {
    name: "Cotton Mesh",
    className:
      "bg-[hsla(0,73%,68%,1)] [background-image:radial-gradient(at_9%_4%,hsla(192,94%,55%,1)_0px,_transparent_50%),radial-gradient(at_25%_61%,hsla(300,61%,55%,1)_0px,_transparent_50%),radial-gradient(at_98%_23%,hsla(232,94%,55%,1)_0px,_transparent_50%),radial-gradient(at_26%_7%,hsla(286,64%,55%,1)_0px,_transparent_50%),radial-gradient(at_27%_46%,hsla(246,86%,55%,1)_0px,_transparent_50%),radial-gradient(at_73%_36%,hsla(290,67%,55%,1)_0px,_transparent_50%),radial-gradient(at_27%_96%,hsla(302,76%,55%,1)_0px,_transparent_50%)]",
  },
  {
    name: "Indigo Pink",
    className:
      "bg-gradient-to-br from-indigo-700 from-10% via-purple-600 via-30% to-pink-600 to-90% saturate-[115%]",
  },
  {
    name: "Orange Hibiscus",
    className:
      "bg-gradient-to-br from-fuchsia-700 from-0% to-orange-600 to-100% saturate-[115%]",
  },
  {
    name: "Purple Blast",
    className:
      "bg-gradient-to-tl from-fuchsia-500 from-0% to-blue-500 to-100% saturate-[115%]",
  },
  {
    name: "Summer Breeze",
    className:
      "bg-gradient-to-br from-yellow-400 from-0% to-pink-500 to-100% saturate-[115%]",
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
      <div className="flex items-center gap-2">
        <Checkbox
          id="background"
          checked={settings.backgroundColor !== "bg-transparent"}
          onCheckedChange={(checked: boolean) =>
            !checked
              ? setBackgroundColor("bg-transparent")
              : setBackgroundColor(defaultSettings.backgroundColor)
          }
        />
        <LabelTooltip
          htmlFor="background"
          tooltip="Quickly toggle using your arrow keys"
        >
          Background
        </LabelTooltip>
      </div>
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
