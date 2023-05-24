import { Settings as SettingsType } from "@config/defaults";
import { AspectRatio } from "./AspectRatio";
import { ScalePosition } from "./ScalePosition";
import { Padding } from "./Padding";
import { Background } from "./Background";
import { Header } from "./Header";

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
  return (
    <div className="flex flex-col gap-y-3">
      <Header
        setAspectRatio={setAspectRatio}
        setScale={setScale}
        setPositionX={setPositionX}
        setPositionY={setPositionY}
        setInsetPadding={setInsetPadding}
        setBackgroundColor={setBackgroundColor}
      />
      <AspectRatio settings={settings} setAspectRatio={setAspectRatio} />
      <ScalePosition
        settings={settings}
        setScale={setScale}
        setPositionX={setPositionX}
        setPositionY={setPositionY}
      />
      <Padding
        settings={settings}
        setInsetColor={setInsetColor}
        setInsetPadding={setInsetPadding}
      />
      <Background settings={settings} setBackgroundColor={setBackgroundColor} />
    </div>
  );
};
