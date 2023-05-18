import * as React from "react";
import Image from "next/image";
import placeholder from "../app/placeholder.svg";
import { getBackgroundColor, isColorDark, rgbToHex } from "@utils/color";
import { pasteImage } from "@utils/clipboard";
import { useToast } from "@hooks/useToast";
import { Check, XCircle } from "lucide-react";

export const ClipboardImage = ({
  insetColor,
  insetPadding,
  setInsetColor,
  setInsetPadding,
  setIsDark,
}: {
  insetColor: string;
  insetPadding: number;
  setInsetColor: (input: string) => void;
  setInsetPadding: (input: number) => void;
  setIsDark: (input: boolean) => void;
}) => {
  const { toast } = useToast();

  const imageCallback = React.useCallback(
    (ref: HTMLImageElement | null) => {
      ref?.addEventListener("click", async () => {
        const result = await pasteImage(ref);
        if (result === "SUCCESS") {
          toast({
            title: (
              <span className="flex gap-2 items-center">
                <Check />
                Image uploaded successfully
              </span>
            ),
          });
        }
        if (result instanceof Error)
          toast({
            title: (
              <span className="flex gap-2 items-center">
                <XCircle />
                {result.message}
              </span>
            ),
            variant: "destructive",
          });
      });
      ref?.addEventListener("load", () => {
        const backgroundColor = getBackgroundColor(ref);
        if (backgroundColor) {
          const hexColor = rgbToHex(backgroundColor);
          if (hexColor) {
            setInsetColor(hexColor);
            setInsetPadding(1);
          }
          const isDark = isColorDark(backgroundColor);
          if (isDark !== undefined) {
            setIsDark(isDark);
          }
        }
      });
    },
    [setInsetColor, setInsetPadding, setIsDark, toast]
  );

  return (
    <Image
      src={placeholder}
      ref={imageCallback}
      alt="Image"
      quality={100}
      className="w-auto min-h-fit max-h-full object-contain rounded-md shadow-2xl"
      priority={true}
      style={{
        padding: `${insetPadding}%`,
        background: insetPadding ? insetColor : "transparent",
      }}
    />
  );
};
