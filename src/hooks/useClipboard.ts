import { useState } from "react";
import { useTimeout } from "@hooks/useTimeout";

type CopyState = "READY" | "SUCCESS" | "ERROR";

/**
 * Writes the specified text string to the system clipboard
 * using `Clipboard.writeText()`
 * ref: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * @param delay - The time, in milliseconds before resetting the clipboard
 * @returns Method to `copy` and `state` for the clipboard
 */
export const useClipboard = ({ delay = 2000 } = {}) => {
  const [state, setState] = useState<CopyState>("READY");
  const timeout = useTimeout(() => setState("READY"), delay);

  function handleCopyResult(result: CopyState) {
    setState(result);
    timeout.call();
  }

  function copy(clipboardItem: ClipboardItem) {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .write([clipboardItem])
        .then(() => handleCopyResult("SUCCESS"))
        .catch((error) => error instanceof Error && handleCopyResult("ERROR"));
    } else {
      handleCopyResult("ERROR");
    }
  }

  return { copy, state };
};
