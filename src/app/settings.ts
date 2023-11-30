import { createSearchParamsConfig } from "@search-params/react";
import {
  type Input,
  fallback,
  number,
  object,
  parse,
  minValue,
  union,
  literal,
  maxValue,
  boolean,
} from "valibot";

const settingsSchema = object({
  width: fallback(number([minValue(0)]), 1200),
  height: fallback(number([minValue(0)]), 675),
  autoCenter: fallback(boolean(), true),
  scale: fallback(number([minValue(0), maxValue(200)]), 100),
  positionX: fallback(number([minValue(-200), maxValue(200)]), 0),
  positionY: fallback(number([minValue(-200), maxValue(200)]), 0),
  shadowBlur: fallback(number([minValue(0), maxValue(200)]), 100),
  shadowPositionX: fallback(number([minValue(-200), maxValue(200)]), 0),
  shadowPositionY: fallback(number([minValue(-200), maxValue(200)]), 100),
  exportScale: fallback(
    union([literal(1), literal(1.5), literal(2), literal(3)]),
    1.5
  ),
  currentTab: fallback(
    union([
      literal("layout"),
      literal("image"),
      literal("shadow"),
      literal("export"),
    ]),
    "layout"
  ),
});

// Excluding component state such as "currentTab"
export type Settings = Omit<Input<typeof settingsSchema>, "currentTab">;

export const config = createSearchParamsConfig({
  main: (search) => parse(settingsSchema, search),
});
