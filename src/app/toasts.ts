import { useToast } from "@/hooks/useToast";
import { MUTATIONS } from "@/lib/queries";

type Operation = keyof typeof MUTATIONS;

type OperationResult = "SUCCESS" | "ERROR";

type Toast = Parameters<ReturnType<typeof useToast>["toast"]>[number];

export const TOASTS: Record<Operation, Record<OperationResult, Toast>> = {
  ADD_ASSET: {
    SUCCESS: {
      title: "Asset successfully uploaded 🔥",
    },
    ERROR: {
      variant: "destructive",
      title: "Asset Upload failed",
    },
  },
  DELETE_ASSET: {
    SUCCESS: {
      title: "Asset successfully deleted 🙏🏼",
    },
    ERROR: {
      variant: "destructive",
      title: "Asset Deletion failed",
    },
  },
  COPY: {
    SUCCESS: {
      title: "Screenshot successfully copied 🥳",
      description: "Check your clipboard's images",
    },
    ERROR: {
      variant: "destructive",
      title: "Copy to Clipboard failed",
    },
  },
  DOWNLOAD: {
    SUCCESS: {
      title: "Screenshot successfully downloaded 🥳",
      description: "Check your recent downloads",
    },
    ERROR: {
      variant: "destructive",
      title: "Download failed",
    },
  },
};
