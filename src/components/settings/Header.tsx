import { Button } from "@components/ui/Button";
import { Tooltip } from "@components/ui/Tooltip";
import { Settings, defaultSettings, suggestedSettings } from "@config/defaults";
import { RotateCcw } from "lucide-react";

export const Header = ({
  setAspectRatio,
  setScale,
  setPositionX,
  setPositionY,
  setInsetPadding,
  setBackgroundColor,
}: {
  setAspectRatio: (v: Settings["aspectRatio"]) => void;
  setScale: (v: Settings["scale"]) => void;
  setPositionX: (v: Settings["positionX"]) => void;
  setPositionY: (v: Settings["positionY"]) => void;
  setInsetPadding: (v: Settings["insetPadding"]) => void;
  setBackgroundColor: (v: Settings["backgroundColor"]) => void;
}) => {
  const handleReset = () => {
    setAspectRatio(defaultSettings.aspectRatio);
    setScale(defaultSettings.scale);
    setPositionX(defaultSettings.positionX);
    setPositionY(defaultSettings.positionY);
    setInsetPadding(suggestedSettings.insetPadding);
    setBackgroundColor(defaultSettings.backgroundColor);
  };

  return (
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
  );
};
