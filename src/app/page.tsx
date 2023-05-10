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
import { cn } from "@utils/cn";

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState("aspect-video");
  const clipboard = useImageRenderer();
  const download = useImageRenderer();

  return (
    <section className="h-[70vh] flex w-full gap-6">
      <div className="flex w-full h-full justify-center items-center">
        <div
          ref={clipboardRef}
          className={`${cn(
            "h-fit max-h-[70hv] flex items-center justify-center p-12 rounded-md bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
            value
          )}`}
        >
          <ClipboardImage />
        </div>
      </div>
      <div className="gap-4 h-full flex flex-col justify-between border-l pl-6 min-w-[300px]">
        <div>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger>
              <SelectValue aria-label="default">{value}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="aspect-video">
                16:9
              </SelectItem>
              <SelectItem disabled value="aspect-[3/4]">
                3:4
              </SelectItem>
              <SelectItem disabled value="aspect-square">
                1:1
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
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
    </section>
  );
}
