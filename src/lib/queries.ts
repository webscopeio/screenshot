/* eslint-disable no-useless-catch */
import { toBlob, toPng } from "html-to-image";
import { get, set, del } from "idb-keyval";
import { Settings } from "@/app/settings";

const ASSET_TYPE = {
  BACKGROUND: "background",
  IMAGE: "image",
} as const;

type AssetType = (typeof ASSET_TYPE)[keyof typeof ASSET_TYPE];

type Background = {
  file: string;
  src: string;
  assetType: AssetType;
};

type Image = Background & {
  height: number;
  width: number;
};

export const QUERIES = {
  GET_BACKGROUND: {
    key: ASSET_TYPE.BACKGROUND,
    fn: async () => (await get<Background>(ASSET_TYPE.BACKGROUND)) ?? null,
  },
  GET_IMAGE: {
    key: ASSET_TYPE.IMAGE,
    fn: async () => (await get<Image>(ASSET_TYPE.IMAGE)) ?? null,
  },
} as const;

export const MUTATIONS = {
  ADD_ASSET: async (props: Background | Image) => {
    // Is Image
    if ("width" in props && "height" in props) {
      const { assetType, file, src, width, height } = props;
      try {
        await set(assetType, {
          file,
          src,
          width,
          height,
        });
      } catch (error) {
        throw error;
      }
      return;
    }

    // Is Background
    const { assetType, file, src } = props;
    try {
      await set(assetType, {
        file,
        src,
      });
    } catch (error) {
      throw error;
    }
  },
  DELETE_ASSET: async ({ assetType }: { assetType: AssetType }) => {
    try {
      await del(assetType);
    } catch (error) {
      throw error;
    }
  },
  COPY: async ({
    node,
    exportScale,
    width,
    height,
  }: {
    node: React.RefObject<HTMLDivElement>;
    exportScale: Settings["exportScale"];
    width: Settings["width"];
    height: Settings["height"];
  }) => {
    if (node.current) {
      const nodeClone = node.current.cloneNode(true) as HTMLDivElement;
      nodeClone.style.transform = "scale(1)";
      nodeClone.style.top = "0";
      nodeClone.style.left = "0";

      const style = {
        transform: `scale(${exportScale})`,
        "transform-origin": "top left",
        width: width + "px",
        height: height + "px",
      };

      try {
        const blob = await toBlob(nodeClone, {
          width: width * exportScale,
          height: height * exportScale,
          style,
        });

        if (blob) {
          const data = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([data]);
        }
      } catch (error) {
        throw error;
      }
    }
  },
  DOWNLOAD: async ({
    node,
    exportScale,
    width,
    height,
  }: {
    node: React.RefObject<HTMLDivElement>;
    exportScale: Settings["exportScale"];
    width: Settings["width"];
    height: Settings["height"];
  }) => {
    if (node.current) {
      const nodeClone = node.current.cloneNode(true) as HTMLDivElement;
      nodeClone.style.transform = "scale(1)";
      nodeClone.style.top = "0";
      nodeClone.style.left = "0";

      const style = {
        transform: `scale(${exportScale})`,
        "transform-origin": "top left",
        width: width + "px",
        height: height + "px",
      };

      try {
        const toDataURL = await toPng(nodeClone, {
          width: width * exportScale,
          height: height * exportScale,
          style,
        });

        const link = document.createElement("a");
        link.href = toDataURL;
        link.download = "download.png";
        link.click();
      } catch (error) {
        throw error;
      }
    }
  },
};
