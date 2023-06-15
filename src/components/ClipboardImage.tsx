import * as React from "react";
import Image from "next/image";
import { Check, XCircle } from "lucide-react";
import placeholder from "../app/placeholder.svg";
import { getBackgroundColor, rgbToHex } from "@utils/color";
import { pasteImage } from "@utils/clipboard";
import { useToast } from "@hooks/useToast";
import { suggestedSettings } from "@config/defaults";
import { cn } from "@utils/cn";

export const ClipboardImage = ({
  insetColor,
  scale,
  positionX,
  positionY,
  insetPadding,
  enableShadows,
  setInsetColor,
  setInsetPadding,
}: {
  insetColor: string;
  scale: number;
  positionX: number;
  positionY: number;
  insetPadding: number;
  enableShadows: boolean;
  setInsetColor: (input: string) => void;
  setInsetPadding: (input: number) => void;
}) => {
  const { toast } = useToast();
  const imageRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    if (imageRef.current) {
      const currentImage = imageRef.current;
      currentImage.onload = () => {
        const backgroundColor = getBackgroundColor(currentImage);
        if (backgroundColor) {
          const hexColor = rgbToHex(backgroundColor);
          if (hexColor) {
            setInsetColor(hexColor);
            setInsetPadding(suggestedSettings.insetPadding);
          }
        }
      };
    }
  }, [setInsetColor, setInsetPadding]);

  React.useEffect(() => {
    if (imageRef.current) {
      const currentImage = imageRef.current;
      currentImage.onclick = async () => {
        const result = await pasteImage(currentImage);
        if (result === "SUCCESS") {
          toast({
            title: (
              <span className="flex items-center gap-2">
                <Check />
                Image uploaded successfully
              </span>
            ),
          });
        }
        if (result instanceof Error)
          toast({
            title: (
              <span className="flex items-center gap-2">
                <XCircle />
                {result.message}
              </span>
            ),
            variant: "destructive",
          });
      };
    }
  }, [toast]);

  return (
    <Image
      src={placeholder}
      ref={imageRef}
      alt="Image"
      quality={100}
      className={cn(
        "max-h-full min-h-fit w-auto rounded-md object-contain",
        enableShadows && "shadow-3xl"
      )}
      priority={true}
      style={{
        padding: `${insetPadding}%`,
        background: insetPadding ? insetColor : "transparent",
        scale: `${scale / 100}`,
        transform: `translate(${positionX}%, ${positionY}%)`,
      }}
    />
  );
};
