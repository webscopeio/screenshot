"use client";

import * as React from "react";
import { Clipboard, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/Selector";
import { ClipboardImage } from "@components/ClipboardImage";
import { useImageRenderer } from "@hooks/useImageRenderer";
import { ActionButton } from "@components/ActionButton";

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState("16:9");
  const clipboard = useImageRenderer();
  const download = useImageRenderer();

  return (
    <div className="space-y-3 flex flex-col items-center w-full max-w-6xl">
      <div className="flex w-full gap-2 justify-between">
        <div>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue aria-label="default">{value}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="16:9">
                16:9
              </SelectItem>
              <SelectItem disabled value="box">
                4:3
              </SelectItem>
              <SelectItem disabled value="square">
                1:1
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
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
      </div>
      <div
        ref={clipboardRef}
        className="h-full aspect-video flex items-center justify-center p-12 rounded-md bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
      >
        <ClipboardImage />
      </div>
    </div>
  );
}
