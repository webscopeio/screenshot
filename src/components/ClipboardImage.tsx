import * as React from "react";
import Image from "next/image";
import placeholder from "../app/placeholder.svg";

const pasteImage = async (ref: HTMLImageElement) => {
  try {
    const permissionName = "clipboard-read" as PermissionName;
    const permission = await navigator.permissions.query({
      name: permissionName,
    });
    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.");
    }
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      if (!item.types.includes("image/png")) {
        throw new Error("Clipboard contains non-image data.");
      }
      const blob = await item.getType("image/png");
      const src = URL.createObjectURL(blob);
      ref.src = src;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

function rgbToHex(color: string) {
  const rgbValues = color.match(/\d+/g);
  if (rgbValues) {
    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    return `#${hex}`;
  }
}

function isColorDark(color: string) {
  const rgbValues = color.match(/\d+/g);
  if (rgbValues) {
    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);

    // Calculate luminance using the formula: L = (0.299*R + 0.587*G + 0.114*B)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Determine if the color is dark or light based on the luminance threshold
    return luminance <= 0.5; // Adjust the threshold as needed
  }
}

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
  const ref = React.useRef<HTMLImageElement | null>(null);
  const imageCallback = React.useCallback(
    (ref: HTMLImageElement | null) => {
      ref?.addEventListener("click", () => pasteImage(ref));
      ref?.addEventListener("load", () => {
        // Create a canvas element and set its dimensions
        const canvas = document.createElement("canvas");
        canvas.width = ref.width;
        canvas.height = ref.height;

        // Draw the image onto the canvas
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(ref, 0, 0);

          // Get the image data from the canvas
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;

          // Create an object to store the pixel counts for each color
          const colorCounts: Record<string, number> = {};

          // Iterate through each pixel (RGBA values)
          for (let i = 0; i < pixels.length; i += 4) {
            // Extract the color values (excluding alpha)
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Convert RGB values to a string representation
            const color = `rgb(${r},${g},${b})`;

            // Increment the pixel count for the color
            colorCounts[color] = (colorCounts[color] || 0) + 1;
          }

          // Find the color with the highest pixel count
          let maxCount = 0;
          let backgroundColor = "";

          for (const color in colorCounts) {
            if (colorCounts[color] > maxCount) {
              maxCount = colorCounts[color];
              backgroundColor = color;
            }
          }

          const hexColor = rgbToHex(backgroundColor);
          if (hexColor) {
            setInsetColor(hexColor ?? "");
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
