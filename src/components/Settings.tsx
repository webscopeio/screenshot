import {
  AspectRatio,
  SUPPORTED_ASPECT_RATIOS,
  Settings as SettingsType,
  defaultSettings,
  suggestedSettings,
} from "@config/defaults";
import { RotateCcw, Info, Check } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { RadioGroup, RadioGroupItemCustom } from "./ui/RadioGroup";
import { Slider } from "./ui/Slider";
import { Tooltip } from "./ui/Tooltip";
import { cn } from "@utils/cn";

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

export const Settings = ({
  settings,
  setAspectRatio,
  setScale,
  setPositionX,
  setPositionY,
  setInsetColor,
  setInsetPadding,
  setBackgroundColor,
}: {
  settings: SettingsType;
  setAspectRatio: (v: SettingsType["aspectRatio"]) => void;
  setScale: (v: SettingsType["scale"]) => void;
  setPositionX: (v: SettingsType["positionX"]) => void;
  setPositionY: (v: SettingsType["positionY"]) => void;
  setInsetColor: (v: SettingsType["insetColor"]) => void;
  setInsetPadding: (v: SettingsType["insetPadding"]) => void;
  setBackgroundColor: (v: SettingsType["backgroundColor"]) => void;
}) => {
  const handleReset = () => {
    setAspectRatio(defaultSettings.aspectRatio);
    setScale(defaultSettings.scale);
    setPositionX(defaultSettings.positionX);
    setPositionY(defaultSettings.positionY);
    setInsetPadding(suggestedSettings.insetPadding);
  };

  return (
    <div className="space-y-3">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold leading-none text-slate-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Settings
        </h2>
        <Tooltip content={<p>Reset settings</p>} side="left">
          <Button
            variant="ghost"
            className="px-3 hover:bg-red-800/90"
            onClick={() => handleReset()}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </Tooltip>
      </header>
      <div className="space-y-3">
        <Label>
          {" "}
          <span>Aspect Ratio</span>
          <Tooltip content={<p>Width and height ratio</p>} side="top">
            <Info className="h-4 w-4 cursor-help stroke-slate-200/90" />
          </Tooltip>
        </Label>
        <RadioGroup
          aria-label="Aspect Ratios"
          className="grid grid-cols-3 gap-2"
          value={settings.aspectRatio}
          onValueChange={(value: string) =>
            setAspectRatio(value as AspectRatio)
          }
        >
          <RadioGroupItemCustom
            aria-label={SUPPORTED_ASPECT_RATIOS.VIDEO}
            className={"border border-slate-100/10 bg-transparent"}
            value={SUPPORTED_ASPECT_RATIOS.VIDEO}
          >
            <div
              className={cn(
                "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
                SUPPORTED_ASPECT_RATIOS.VIDEO
              )}
            >
              <Check aria-hidden={true} className="h-3 w-3" />
            </div>
            <p className="text-xs font-semibold leading-[0] text-slate-200">
              16:9
            </p>
          </RadioGroupItemCustom>
          <RadioGroupItemCustom
            aria-label={SUPPORTED_ASPECT_RATIOS.PHONE}
            className={"border border-slate-100/10 bg-transparent"}
            value={SUPPORTED_ASPECT_RATIOS.PHONE}
          >
            <div
              className={cn(
                "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
                SUPPORTED_ASPECT_RATIOS.PHONE
              )}
            >
              <Check aria-hidden={true} className="h-3 w-3" />
            </div>
            <p className="text-xs font-semibold leading-[0] text-slate-200">
              3:4
            </p>
          </RadioGroupItemCustom>
          <RadioGroupItemCustom
            aria-label={SUPPORTED_ASPECT_RATIOS.AUTO}
            className={"border border-slate-100/10 bg-transparent"}
            value={SUPPORTED_ASPECT_RATIOS.AUTO}
          >
            <div
              className={cn(
                "grid h-full place-content-center rounded-sm border border-dashed border-slate-500",
                SUPPORTED_ASPECT_RATIOS.AUTO,
                SUPPORTED_ASPECT_RATIOS.AUTO && "w-[50%]"
              )}
            >
              <Check aria-hidden={true} className="h-3 w-3" />
            </div>
            <p className="text-xs font-semibold leading-[0] text-slate-200">
              Auto
            </p>
          </RadioGroupItemCustom>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="scale">
          <span>Scale and position</span>{" "}
          <Tooltip
            content={<p>The scale and position of the image</p>}
            side="top"
          >
            <Info className="h-4 w-4 cursor-help stroke-slate-200/90" />
          </Tooltip>
        </Label>
        <div className="flex items-center gap-x-2 mb-2">
          <Slider
            id="scale"
            onValueChange={(value) => setScale(value[0])}
            value={[settings.scale]}
            max={150}
            min={50}
            step={1}
          />
          <Input
            className="w-16"
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
        <div className="flex items-center gap-x-2 mb-2">
          <Label htmlFor="slider-position-x">X</Label>
          <Slider
            id="slider-position-x"
            onValueChange={(value) => setPositionX(value[0])}
            value={[settings.positionX]}
            max={100}
            min={-100}
            step={1}
          />
          <Input
            className="w-20"
            type="number"
            placeholder="0"
            min={-100}
            max={100}
            value={settings.positionX}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              value = value > 100 ? 100 : value;
              value = value < -100 ? -100 : value;
              setPositionX(value);
            }}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="slider-position-y">Y</Label>
          <Slider
            id="slider-position-y"
            onValueChange={(value) => setPositionY(-value[0])}
            value={[-settings.positionY]}
            max={100}
            min={-100}
            step={1}
          />
          <Input
            className="w-20"
            type="number"
            placeholder="0"
            min={-100}
            max={100}
            value={settings.positionY}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              value = value > 100 ? 100 : value;
              value = value < -100 ? -100 : value;
              setPositionY(value);
            }}
          />
        </div>
      </div>
      <div className="space-y-3">
        <Label>
          <span>Inset padding</span>
          <Tooltip
            content={<p>Space between original image and padding</p>}
            side="top"
          >
            <Info className="h-4 w-4 cursor-help stroke-slate-200/90" />
          </Tooltip>
        </Label>
        <div className="flex flex-col space-y-2">
          <Input
            type="color"
            value={settings.insetColor}
            onChange={(e) => setInsetColor(e.target.value)}
          />
          <div className="flex items-center gap-x-2">
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
      <div className="space-y-3">
        <Label>
          {" "}
          <span>Background</span>
          <Tooltip
            content={<p>Quickly toggle using your arrow keys</p>}
            side="top"
          >
            <Info className="h-4 w-4 cursor-help stroke-slate-200/90" />
          </Tooltip>
        </Label>
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
    </div>
  );
};
