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

export const ClipboardImage = () => {
  const imageCallback = React.useCallback((ref: HTMLImageElement | null) => {
    ref?.addEventListener("click", () => pasteImage(ref));
  }, []);

  return (
    <Image
      src={placeholder}
      ref={imageCallback}
      alt="Image"
      quality={100}
      className="w-auto min-h-fit max-h-full object-contain rounded-md shadow-2xl"
      priority={true}
    />
  );
};
