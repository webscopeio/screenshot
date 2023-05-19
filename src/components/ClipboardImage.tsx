import * as React from "react";
import Image from "next/image";
import placeholder from "../app/placeholder.svg";
import { getBackgroundColor, rgbToHex } from "@utils/color";
import { pasteImage } from "@utils/clipboard";
import { useToast } from "@hooks/useToast";
import { Check, XCircle } from "lucide-react";
import { suggestedSettings } from "@config/defaults";

export const ClipboardImage = ({
  insetColor,
  insetPadding,
  setInsetColor,
  setInsetPadding,
}: {
  insetColor: string;
  insetPadding: number;
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
      className="max-h-full min-h-fit w-auto rounded-md object-contain shadow-2xl"
      priority={true}
      style={{
        padding: `${insetPadding}%`,
        background: insetPadding ? insetColor : "transparent",
      }}
    />
  );
};
