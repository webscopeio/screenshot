import * as React from "react";
import { Settings } from "@config/defaults";

type SettingActions =
	| {
			type: "SET_ASPECT_RATIO";
			value: Settings["aspectRatio"];
	  }
	| {
			type: "SET_SCALE";
			value: Settings["scale"];
	  }
	| {
			type: "SET_POSITIONX";
			value: Settings["positionX"];
	  }
	| {
			type: "SET_POSITIONY";
			value: Settings["positionY"];
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
	  }
	| {
			type: "SET_BACKGROUND_IMAGE";
			value: Settings["backgroundImage"];
	  }
	| {
			type: "SET_WIDTH";
			value: Settings["width"];
	  }
	| {
			type: "SET_UPSCALE";
			value: Settings["upscale"];
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
		case "SET_SCALE":
			return {
				...prevState,
				scale: value,
			};
		case "SET_POSITIONX":
			return {
				...prevState,
				positionX: value,
			};
		case "SET_POSITIONY":
			return {
				...prevState,
				positionY: value,
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
		case "SET_BACKGROUND_IMAGE": {
			return {
				...prevState,
				backgroundImage: value,
			};
		}
		case "SET_WIDTH": {
			return {
				...prevState,
				width: value,
			};
		}
		case "SET_UPSCALE": {
			return {
				...prevState,
				upscale: value,
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
		setScale: (value: Settings["scale"]) =>
			dispatch({ type: "SET_SCALE", value }),
		setPositionX: (value: Settings["positionX"]) =>
			dispatch({ type: "SET_POSITIONX", value }),
		setPositionY: (value: Settings["positionY"]) =>
			dispatch({ type: "SET_POSITIONY", value }),
		setInsetColor: (value: Settings["insetColor"]) =>
			dispatch({ type: "SET_INSET_COLOR", value }),
		setInsetPadding: (value: Settings["insetPadding"]) =>
			dispatch({ type: "SET_INSET_PADDING", value }),
		setBackgroundColor: (value: Settings["backgroundColor"]) =>
			dispatch({ type: "SET_BACKGROUND_COLOR", value }),
		setBackgroundImage: (value: Settings["backgroundImage"]) =>
			dispatch({ type: "SET_BACKGROUND_IMAGE", value }),
		setWidth: (value: Settings["width"]) =>
			dispatch({ type: "SET_WIDTH", value }),
		setUpscale: (value: Settings["upscale"]) =>
			dispatch({ type: "SET_UPSCALE", value }),
	};
};
