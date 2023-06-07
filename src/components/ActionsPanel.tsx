"use client";

import * as React from "react";
import { Clipboard, Download } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { useImageRenderer } from "@hooks/useImageRenderer";
import { Settings } from "@config/defaults";

export const ActionPanel: React.FC<{
  settings: Settings
  clipboardRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ settings, clipboardRef }) => {
  const clipboard = useImageRenderer();
  const download = useImageRenderer();
  return (
    <div className="flex flex-col gap-3">
      <ActionButton
        variant="secondary"
        state={clipboard.state}
        onClick={() =>
          clipboardRef.current && clipboard.copy(clipboardRef.current, settings)
        }
        icon={<Clipboard className="h-5 w-5 opacity-80" />}
      >
        Copy to Clipboard
      </ActionButton>
      <ActionButton
        state={download.state}
        onClick={() =>
          clipboardRef.current && download.download(clipboardRef.current, settings)
        }
        icon={<Download className="h-5 w-5" />}
      >
        Download
      </ActionButton>
    </div>
  );
};
