"use client";

import * as React from "react";
import { ActionButton } from "./ActionButton";
import { Clipboard, Download } from "lucide-react";
import { useImageRenderer } from "@hooks/useImageRenderer";

export const ActionPanel: React.FC<{
  clipboardRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ clipboardRef }) => {
  const clipboard = useImageRenderer();
  const download = useImageRenderer();
  return (
    <div className="flex flex-col gap-3">
      <ActionButton
        variant="secondary"
        state={clipboard.state}
        onClick={() =>
          clipboardRef.current && clipboard.copy(clipboardRef.current)
        }
        icon={<Clipboard className="h-5 w-5 opacity-80" />}
      >
        Copy to Clipboard
      </ActionButton>
      <ActionButton
        state={download.state}
        onClick={() =>
          clipboardRef.current && download.download(clipboardRef.current)
        }
        icon={<Download className="h-5 w-5" />}
      >
        Download
      </ActionButton>
    </div>
  );
};
