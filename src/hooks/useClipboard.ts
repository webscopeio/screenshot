const CopyState = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

/**
 * Writes the specified text string to the system clipboard
 * using `Clipboard.write()`
 * ref: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write)
 * @param delay - The time, in milliseconds before resetting the clipboard
 * @returns Method to `copy` for the clipboard
 */
export const useClipboard = () => {
  async function copy(
    clipboardItem: ClipboardItem
  ): Promise<keyof typeof CopyState> {
    if ("clipboard" in navigator) {
      return await navigator.clipboard
        .write([clipboardItem])
        .then(() => {
          return CopyState.SUCCESS;
        })
        .catch((_error) => {
          return CopyState.ERROR;
        });
    } else {
      return CopyState.ERROR;
    }
  }

  return { copy };
};
