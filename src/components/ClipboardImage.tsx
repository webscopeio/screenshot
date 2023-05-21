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
  setImagesHistoryUrl,
  imagesHistoryUrl,
  selectedImageUrl,
}: {
  insetColor: string;
  insetPadding: number;
  setInsetColor: (input: string) => void;
  setInsetPadding: (input: number) => void;
  setImagesHistoryUrl: React.Dispatch<React.SetStateAction<string[]>>
  imagesHistoryUrl: string[]
  selectedImageUrl: string
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
    // Checks if there are selected images from the shared state
    if (imageRef.current && selectedImageUrl) {
      // If there are, set the "src" of the ref to the selected image
      const currentImage = imageRef.current;
      currentImage.src = selectedImageUrl;
    }
    if (imageRef.current) {
      const currentImage = imageRef.current;
      currentImage.onclick = async () => {
        const result = await pasteImage(currentImage);
        if (result === "SUCCESS") {
          // Adds the images to the shared history state, only if there are less than 10.
          imagesHistoryUrl.length < 10 && (
            setImagesHistoryUrl((prevUrl) => [currentImage.src, ...prevUrl])
          );
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
  }, [toast, setImagesHistoryUrl, selectedImageUrl, imagesHistoryUrl.length]);

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
