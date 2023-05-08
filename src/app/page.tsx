"use client";

import * as React from "react";
import { toBlob, toPng } from "html-to-image";
import { Button } from "@components/Button";
import { useClipboard } from "@hooks/useClipboard";
import { Clipboard, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/Selector";
import { ClipboardImage } from "@components/ClipboardImage";

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const clipboard = useClipboard();
  const [value, setValue] = React.useState("16:9");

  const handleCopyToClipboard = React.useCallback(() => {
    if (clipboardRef.current === null) {
      return;
    }

    const scale = 3;

    const style = {
      transform: `scale(${scale})`,
      "transform-origin": "top left",
      width: clipboardRef.current.offsetWidth + "px",
      height: clipboardRef.current.offsetHeight + "px",
    };

    toBlob(clipboardRef.current, {
      height: clipboardRef.current.offsetHeight * scale,
      width: clipboardRef.current.offsetWidth * scale,
      style,
    })
      .then((blob) => {
        if (!blob) {
          return;
        }
        const data = new ClipboardItem({ "image/png": blob });
        clipboard.copy(data);
      })
      .catch(function (error) {
        console.error("Oops, something went wrong!", error);
      });
  }, [clipboard]);

  const handleDownload = React.useCallback(() => {
    if (clipboardRef.current === null) {
      return;
    }

    const scale = 3;

    const style = {
      transform: `scale(${scale})`,
      "transform-origin": "top left",
      width: clipboardRef.current.offsetWidth + "px",
      height: clipboardRef.current.offsetHeight + "px",
    };

    toPng(clipboardRef.current, {
      height: clipboardRef.current.offsetHeight * scale,
      width: clipboardRef.current.offsetWidth * scale,
      style,
    })
      .then((toDataURL) => {
        const link = document.createElement("a");
        link.download = "download.png";
        link.href = toDataURL;
        link.click();
      })
      .catch(function (error) {
        console.error("Oops, something went wrong!", error);
      });
  }, [clipboardRef]);

  return (
    <div className="space-y-3 flex flex-col items-center">
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
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => handleCopyToClipboard()}
          >
            <Clipboard className="h-5 w-5 opacity-80" />
            Copy to Clipboard
          </Button>
          <Button className="gap-2" onClick={() => handleDownload()}>
            <Download className="h-5 w-5" />
            Download
          </Button>
        </div>
      </div>
      <div
        ref={clipboardRef}
        className="h-[540px] w-[960px] rounded-md bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex items-center justify-center p-6"
      >
        <ClipboardImage />
      </div>
    </div>
  );
}
