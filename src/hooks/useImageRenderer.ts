import { useState } from "react";
import { toBlob, toPng } from "html-to-image";
import { useClipboard } from "./useClipboard";
import { useTimeout } from "@hooks/useTimeout";
import { type Settings } from "@config/defaults";

export const ImageRendererState = {
  READY: "READY",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  LOADING: "LOADING",
} as const;

/**
 * Uses `html-to-image`
 * @param delay - The time, in milliseconds before resetting the methods
 * @returns Method to `copy`, `download` and `state` for the clipboard
 */
export const useImageRenderer = ({ delay = 2000 } = {}) => {
  const [state, setState] = useState<keyof typeof ImageRendererState>("READY");
  const clipboard = useClipboard();
  const timeout = useTimeout(() => setState("READY"), delay);

  function handleImageRendererState(result: keyof typeof ImageRendererState) {
    setState(result);
    timeout.call();
  }

  function copy(node: HTMLDivElement, settings: Settings) {
    const style = {
      transform: `scale(${settings.upscale})`,
      "transform-origin": "top left",
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px",
    };

    handleImageRendererState("LOADING");

    try {
      toBlob(node, {
        width: node.offsetWidth * parseInt(settings.upscale),
        height: node.offsetHeight * parseInt(settings.upscale),
        style,
      })
        .then(async (blob) => {
          if (!blob) {
            handleImageRendererState("ERROR");
            return;
          }
          const data = new ClipboardItem({ "image/png": blob });
          const clipboardState = await clipboard.copy(data);
          handleImageRendererState(clipboardState);
        })
        .catch((error) => {
          error instanceof Error && handleImageRendererState("ERROR");
        });
    } catch (error) {
      error instanceof Error && handleImageRendererState("ERROR");
    }
  }

  function download(node: HTMLDivElement, settings: Settings) {
    const style = {
      transform: `scale(${settings.upscale})`,
      "transform-origin": "top left",
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px",
    };

    handleImageRendererState("LOADING");

    try {
      toPng(node, {
        width: node.offsetWidth * parseInt(settings.upscale),
        height: node.offsetHeight * parseInt(settings.upscale),
        style,
      })
        .then((toDataURL) => {
          const link = document.createElement("a");
          link.download = "download.png";
          link.href = toDataURL;
          link.click();
          handleImageRendererState("SUCCESS");
        })
        .catch((error) => {
          error instanceof Error && handleImageRendererState("ERROR");
        });
    } catch (error) {
      error instanceof Error && handleImageRendererState("ERROR");
    }
  }

  return { copy, download, state };
};
