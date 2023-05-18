import {
  AspectRatio,
  SUPPORTED_ASPECT_RATIOS,
  Settings as SettingsType,
  defaultSettings,
  suggestedSettings,
} from "@config/defaults";
import { RotateCcw } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";
import { Slider } from "./ui/Slider";
import { Switch } from "./ui/Switch";

export const Settings = ({
  settings,
  setAspectRatio,
  setPadding,
  setInsetColor,
  setInsetPadding,
  setIsDark,
}: {
  settings: SettingsType;
  setAspectRatio: (v: SettingsType["aspectRatio"]) => void;
  setPadding: (v: SettingsType["padding"]) => void;
  setInsetColor: (v: SettingsType["insetColor"]) => void;
  setInsetPadding: (v: SettingsType["insetPadding"]) => void;
  setIsDark: (v: SettingsType["isDark"]) => void;
}) => {
  const handleReset = () => {
    setAspectRatio(defaultSettings.aspectRatio);
    setPadding(defaultSettings.padding);
    setInsetPadding(suggestedSettings.insetPadding);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2 border-slate-700">
        <h2 className="text-lg font-semibold leading-none text-slate-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Settings
        </h2>
        <Button
          variant="ghost"
          className="px-3 hover:bg-red-800/90"
          onClick={() => handleReset()}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <Label htmlFor="aspect-settings">Aspect Ratio</Label>
        <RadioGroup
          id="aspect-settings"
          defaultValue="aspect-video"
          value={settings.aspectRatio}
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
            value={[settings.padding]}
            max={10}
            step={1}
          />
          <Input
            className="w-16"
            type="number"
            placeholder="4"
            min={0}
            max={10}
            value={settings.padding}
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
            value={settings.insetColor}
            onChange={(e) => setInsetColor(e.target.value)}
          />
          <div className="flex gap-x-2 items-center">
            <Slider
              onValueChange={(value) => setInsetPadding(value[0])}
              value={[settings.insetPadding]}
              max={10}
              step={1}
            />
            <Input
              className="w-16"
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
      </div>
      <div className="flex items-center space-x-3">
        <Switch
          checked={settings.isDark}
          onCheckedChange={() => setIsDark(!settings.isDark)}
          id="color-theme"
        />
        <Label htmlFor="color-theme">Dark mode</Label>
      </div>
    </div>
  );
};
