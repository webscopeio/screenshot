type PasteImageState = "SUCCESS" | Error;

export const pasteImage = async (
  ref: HTMLImageElement
): Promise<PasteImageState> => {
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
    return "SUCCESS";
  } catch (error) {
    return error as Error;
  }
};
