import { Input } from "@components/ui/Input";
import { Slider } from "@components/ui/Slider";
import { Settings } from "@config/defaults";
import { LabelTooltip } from "./LabelTooltip";

export const Padding = ({
  settings,
  setInsetColor,
  setInsetPadding,
}: {
  settings: Settings;
  setInsetColor: (v: Settings["insetColor"]) => void;
  setInsetPadding: (v: Settings["insetPadding"]) => void;
}) => {
  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between">
        <LabelTooltip
          htmlFor="padding-color"
          tooltip="Space between image and inset border"
        >
          Padding
        </LabelTooltip>
        <div className="flex gap-x-2">
          <Input
            id="padding-color"
            className="w-[68px]"
            type="color"
            value={settings.insetColor}
            onChange={(e) => setInsetColor(e.target.value)}
          />
          <Input
            className="w-[68px]"
            type="number"
            placeholder="4"
            min={0}
            max={10}
            value={settings.insetPadding}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              value = value > 10 ? 10 : value;
              value = value < 0 ? 0 : value;
              setInsetPadding(value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-x-2">
          <Slider
            onValueChange={(value) => setInsetPadding(value[0])}
            value={[settings.insetPadding]}
            max={10}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};
