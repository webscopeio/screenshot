"use client";

import * as React from "react";
import Image from "next/image";
import placeholder from "./placeholder.svg";
import { toPng } from "html-to-image";

async function pasteImage(ref: HTMLImageElement | null) {
  if (!ref) {
    return;
  }
  try {
    const permissionName = "clipboard-read" as PermissionName;
    const permission = await navigator.permissions.query({
      name: permissionName,
    });
    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.");
    }
    const clipboardContents = await navigator.clipboard.read();
    console.log(clipboardContents);
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
}

export default function Home() {
  const ref = React.useRef<HTMLImageElement | null>(null);
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);

  const handleDownload = React.useCallback(() => {
    if (clipboardRef.current === null) {
      return;
    }

    const scale = 3;

    const style = {
      transform: `scale(${scale})`,
      "transform-origin": "top left",
      width: clipboardRef.current.offsetWidth + "px",
      height: clipboardRef.current.offsetHeight + "px",
    };

    toPng(clipboardRef.current, {
      height: clipboardRef.current.offsetHeight * scale,
      width: clipboardRef.current.offsetWidth * scale,
      style,
    })
      .then((toDataURL) => {
        const link = document.createElement("a");
        link.download = "download.png";
        link.href = toDataURL;
        link.click();
      })
      .catch(function (error) {
        console.error("Oops, something went wrong!", error);
      });
  }, [clipboardRef]);

  return (
    <div className="space-y-4 flex flex-col items-center">
      <button
        onClick={() => handleDownload()}
        className="px-4 py-2 border rounded-md w-fit"
      >
        Copy to Clipboard
      </button>
      <div
        ref={clipboardRef}
        className="h-[500px] w-[900px] rounded-md bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex items-center justify-center p-12"
      >
        <Image
          src={placeholder}
          ref={ref}
          onClick={() => pasteImage(ref.current)}
          alt="Image"
          quality={100}
          className="w-fit max-h-full object-contain rounded-md shadow-2xl"
          priority={true}
        />
      </div>
    </div>
  );
}
