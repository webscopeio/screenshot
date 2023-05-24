import { Input } from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Slider } from "@components/ui/Slider";
import { Settings } from "@config/defaults";
import { LabelTooltip } from "./LabelTooltip";

export const ScalePosition = ({
  settings,
  setScale,
  setPositionX,
  setPositionY,
}: {
  settings: Settings;
  setScale: (v: Settings["scale"]) => void;
  setPositionX: (v: Settings["positionX"]) => void;
  setPositionY: (v: Settings["positionY"]) => void;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <LabelTooltip
          htmlFor="scale"
          tooltip="The scale and position of the image"
        >
          Scale and position
        </LabelTooltip>
        <Input
          id="scale"
          className="w-[68px]"
          type="number"
          placeholder="100"
          min={50}
          max={150}
          value={settings.scale}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            value = value > 150 ? 150 : value;
            value = value < 50 ? 50 : value;
            setScale(value);
          }}
        />
      </div>
      <div className="space-y-4">
        <Slider
          onValueChange={(value) => setScale(value[0])}
          value={[settings.scale]}
          max={150}
          min={50}
        />
        <div className="flex items-center gap-x-2">
          <Label className="w-5">-x</Label>
          <Slider
            onValueChange={(value) => setPositionX(value[0])}
            value={[settings.positionX]}
            max={100}
            min={-100}
          />
          <Label className="w-5">x</Label>
        </div>
        <div className="flex items-center gap-x-2">
          <Label className="w-5">-y</Label>
          <Slider
            onValueChange={(value) => setPositionY(value[0])}
            value={[settings.positionY]}
            max={100}
            min={-100}
            step={1}
          />
          <Label className="w-5">y</Label>
        </div>
      </div>
    </div>
  );
};
