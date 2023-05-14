import * as React from "react";
import Image from "next/image";
import placeholder from "../app/placeholder.svg";
import { getBackgroundColor, isColorDark, rgbToHex } from "@utils/color";
import { pasteImage } from "@utils/clipboard";

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
  const imageCallback = React.useCallback(
    (ref: HTMLImageElement | null) => {
      ref?.addEventListener("click", () => pasteImage(ref));
      ref?.addEventListener("load", () => {
        const backgroundColor = getBackgroundColor(ref);
        if (backgroundColor) {
          const hexColor = rgbToHex(backgroundColor);
          if (hexColor) {
            setInsetColor(hexColor);
            setInsetPadding(2);
          }
          const isDark = isColorDark(backgroundColor);
          if (isDark) {
            setIsDark(isDark);
          }
        }
      });
    },
    [setInsetColor, setInsetPadding, setIsDark]
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
