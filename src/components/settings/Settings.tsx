import { AspectRatio } from "./AspectRatio";
import { ScalePosition } from "./ScalePosition";
import { Padding } from "./Padding";
import { Background } from "./Background";
import { Header } from "./Header";
import { BackgroundImage } from "./BackgroundImage";
import { Settings as SettingsType } from "@config/defaults";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/Accordion";

export const Settings = ({
  settings,
  setAspectRatio,
  setScale,
  setPositionX,
  setPositionY,
  setInsetColor,
  setInsetPadding,
  setBackgroundColor,
  setBackgroundImage,
}: {
  settings: SettingsType;
  setAspectRatio: (v: SettingsType["aspectRatio"]) => void;
  setScale: (v: SettingsType["scale"]) => void;
  setPositionX: (v: SettingsType["positionX"]) => void;
  setPositionY: (v: SettingsType["positionY"]) => void;
  setInsetColor: (v: SettingsType["insetColor"]) => void;
  setInsetPadding: (v: SettingsType["insetPadding"]) => void;
  setBackgroundColor: (v: SettingsType["backgroundColor"]) => void;
  setBackgroundImage: (v: SettingsType['backgroundImage']) => void;
}) => {
  return (
    <div className="flex flex-col">
      <Header
        setAspectRatio={setAspectRatio}
        setScale={setScale}
        setPositionX={setPositionX}
        setPositionY={setPositionY}
        setInsetPadding={setInsetPadding}
        setBackgroundColor={setBackgroundColor}
      />
      <Accordion defaultValue="size" type="single" collapsible>
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="background">
          <AccordionTrigger>Background</AccordionTrigger>
          <AccordionContent>
            <BackgroundImage settings={settings} setBackgroundImage={setBackgroundImage} setBackgroundColor={setBackgroundColor} />
            <Background settings={settings} setBackgroundColor={setBackgroundColor} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
