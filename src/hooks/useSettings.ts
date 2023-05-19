import * as React from "react";
import { Settings } from "@config/defaults";

type SettingActions =
  | {
      type: "SET_ASPECT_RATIO";
      value: Settings["aspectRatio"];
    }
  | {
      type: "SET_PADDING";
      value: Settings["padding"];
    }
  | {
      type: "SET_INSET_COLOR";
      value: Settings["insetColor"];
    }
  | {
      type: "SET_INSET_PADDING";
      value: Settings["insetPadding"];
    }
  | {
      type: "SET_BACKGROUND_COLOR";
      value: Settings["backgroundColor"];
    };

const settingsReducer = (
  prevState: Settings,
  { type, value }: SettingActions
): Settings => {
  switch (type) {
    case "SET_ASPECT_RATIO":
      return {
        ...prevState,
        aspectRatio: value,
      };
    case "SET_PADDING":
      return {
        ...prevState,
        padding: value,
      };
    case "SET_INSET_COLOR":
      return {
        ...prevState,
        insetColor: value,
      };
    case "SET_INSET_PADDING":
      return {
        ...prevState,
        insetPadding: value,
      };
    case "SET_BACKGROUND_COLOR": {
      return {
        ...prevState,
        backgroundColor: value,
      };
    }
  }
};

export const useSettings = (defaultSettings: Settings) => {
  const [settings, dispatch] = React.useReducer(
    settingsReducer,
    defaultSettings
  );
  return {
    settings,
    setAspectRatio: (value: Settings["aspectRatio"]) =>
      dispatch({ type: "SET_ASPECT_RATIO", value }),
    setPadding: (value: Settings["padding"]) =>
      dispatch({ type: "SET_PADDING", value }),
    setInsetColor: (value: Settings["insetColor"]) =>
      dispatch({ type: "SET_INSET_COLOR", value }),
    setInsetPadding: (value: Settings["insetPadding"]) =>
      dispatch({ type: "SET_INSET_PADDING", value }),
    setBackgroundColor: (value: Settings["backgroundColor"]) =>
      dispatch({ type: "SET_BACKGROUND_COLOR", value }),
  };
};
