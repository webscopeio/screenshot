export const SUPPORTED_ASPECT_RATIOS = {
  VIDEO: "aspect-video",
  PHONE: "aspect-[3/4]",
  SQUARE: "aspect-square",
  AUTO: "aspect-auto",
} as const;

export type AspectRatio =
  (typeof SUPPORTED_ASPECT_RATIOS)[keyof typeof SUPPORTED_ASPECT_RATIOS];

export type Settings = {
  aspectRatio: AspectRatio;
  scale: number;
  positionX: number;
  positionY: number;
  insetColor: string;
  insetPadding: number;
  enableShadows: boolean;
  backgroundColor: string;
  backgroundImage?: string;
  upscale: string;
};

export const defaultSettings: Settings = {
  aspectRatio: "aspect-video",
  scale: 90,
  positionX: 0,
  positionY: 0,
  insetColor: "#000000",
  insetPadding: 0,
  backgroundColor:
    "bg-[hsla(289,74%,35%,1)] [background-image:radial-gradient(at_91%_72%,hsla(262,97%,60%,1)_0px,_transparent_50%),radial-gradient(at_83%_5%,hsla(255,85%,77%,1)_0px,_transparent_50%),radial-gradient(at_90%_37%,hsla(256,98%,74%,1)_0px,_transparent_50%),radial-gradient(at_59%_90%,hsla(264,94%,66%,1)_0px,_transparent_50%),radial-gradient(at_10%_40%,hsla(247,92%,70%,1)_0px,_transparent_50%),radial-gradient(at_25%_62%,hsla(319,96%,65%,1)_0px,_transparent_50%)]",
  upscale: "2",
  enableShadows: true,
};

export const suggestedSettings: Settings = {
  ...defaultSettings,
  insetPadding: 1,
};
