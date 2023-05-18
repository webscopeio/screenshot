export const SUPPORTED_ASPECT_RATIOS = {
  VIDEO: "aspect-video",
  AUTO: "aspect-auto",
} as const;

export type AspectRatio =
  (typeof SUPPORTED_ASPECT_RATIOS)[keyof typeof SUPPORTED_ASPECT_RATIOS];

export type Settings = {
  aspectRatio: AspectRatio;
  padding: number;
  insetColor: string;
  insetPadding: number;
  isDark: boolean;
};

export const defaultSettings: Settings = {
  aspectRatio: "aspect-video",
  padding: 4,
  insetColor: "#000000",
  insetPadding: 0,
  isDark: true,
};

export const suggestedSettings: Settings = {
  ...defaultSettings,
  insetPadding: 1,
};

export const IMAGE_EXPORT_SCALE = 2;
