/* eslint-disable no-useless-catch */
export const pasteImage = async ({
  center,
}: {
  center?: boolean;
}): Promise<
  | {
      src: string;
      height: number;
      width: number;
    }
  | { error: string }
> => {
  try {
    const clipboardContents = await navigator.clipboard.read();
    const res = {
      src: "",
      height: 0,
      width: 0,
    };

    for (const item of clipboardContents) {
      if (!item.types.includes("image/png")) {
        throw new Error("Clipboard contains non-image data.");
      }

      const blob = await item.getType("image/png");
      const base64Src = await convertBlobToBase64(blob);

      const canvasData = await processImage(base64Src, center);

      res.src = canvasData.src;
      res.width = canvasData.width;
      res.height = canvasData.height;
    }

    return res;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Unknown Error, please try again" };
    }
  }
};

const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      }
    };
    reader.readAsDataURL(blob);
  });
};

export const processImage = async (
  src: string,
  center: boolean = true
): Promise<{ src: string; width: number; height: number }> => {
  const image = new Image();
  image.src = src;

  return new Promise<{ src: string; width: number; height: number }>(
    (resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        if (ctx) {
          ctx.drawImage(image, 0, 0);

          if (center) {
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const pixels = imageData.data;

            const dominantColor = calculateDominantColor(pixels);
            const { offsetX, offsetY } = calculateCenter(
              pixels,
              canvas.width,
              canvas.height,
              dominantColor
            );

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = `rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(image, offsetX, offsetY);
          }
          const processedSrc = canvas.toDataURL("image/png");
          resolve({
            src: processedSrc,
            width: canvas.width / 2,
            height: canvas.height / 2,
          });
        }
      };
    }
  );
};
// DOMINANT COLOR

function calculateDominantColor(pixels: Uint8ClampedArray): {
  r: number;
  g: number;
  b: number;
} {
  const colorCounts: { [key: string]: number } = {};
  let maxCount: number = 0;
  let dominantColor: { r: number; g: number; b: number } = { r: 0, g: 0, b: 0 };

  for (let i = 0; i < pixels.length; i += 4) {
    const r: number = pixels[i];
    const g: number = pixels[i + 1];
    const b: number = pixels[i + 2];

    const color: string = `${r},${g},${b}`;
    colorCounts[color] = (colorCounts[color] || 0) + 1;

    if (colorCounts[color] > maxCount) {
      maxCount = colorCounts[color];
      dominantColor = { r, g, b };
    }
  }
  return dominantColor;
}

// CALCULATE CENTER

function calculateCenter(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  dominantColor: { r: number; g: number; b: number }
): { offsetX: number; offsetY: number } {
  let minX: number = width;
  let minY: number = height;
  let maxX: number = 0;
  let maxY: number = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index: number = (y * width + x) * 4;
      const r: number = pixels[index];
      const g: number = pixels[index + 1];
      const b: number = pixels[index + 2];

      if (
        r !== dominantColor.r ||
        g !== dominantColor.g ||
        b !== dominantColor.b
      ) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const contentWidth: number = maxX - minX + 1;
  const contentHeight: number = maxY - minY + 1;

  const offsetX: number = Math.floor((width - contentWidth) / 2 - minX);
  const offsetY: number = Math.floor((height - contentHeight) / 2 - minY);

  return { offsetX, offsetY };
}
