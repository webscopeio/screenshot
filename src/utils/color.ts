export const getBackgroundColor = (ref: HTMLImageElement) => {
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

    return backgroundColor;
  }
};

export const rgbToHex = (color: string) => {
  const rgbValues = color.match(/\d+/g);
  if (rgbValues) {
    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    return `#${hex}`;
  }
};
