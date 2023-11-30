"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { ClipboardIcon, DownloadIcon, Loader2Icon } from "lucide-react";
import { useSearchParams } from "@search-params/react";
import { Container } from "tsparticles-engine";
import { Button } from "./ui/Button";
import { config } from "@/app/settings";
import { MUTATIONS } from "@/lib/queries";
import { useToast } from "@/hooks/useToast";
import { TOASTS } from "@/app/toasts";

export const ActionsPanel: React.FC<{
  clipboardRef: React.RefObject<HTMLDivElement>;
  particlesRef: React.RefObject<Container | null>;
}> = ({ clipboardRef, particlesRef }) => {
  const { exportScale, width, height } = useSearchParams({
    route: config.main,
  });

  const { toast } = useToast();

  const copyMutation = useMutation({
    mutationFn: MUTATIONS.COPY,
    onSuccess: async () => {
      toast(TOASTS.COPY.SUCCESS);
      if (particlesRef.current) {
        if (particlesRef.current.getAnimationStatus()) {
          await particlesRef.current.refresh();
        }
        particlesRef.current.play();
      }
    },
    onError: (error) =>
      toast({ ...TOASTS.COPY.ERROR, description: error.message }),
  });

  const downloadMutation = useMutation({
    mutationFn: MUTATIONS.DOWNLOAD,
    onSuccess: async () => {
      toast(TOASTS.DOWNLOAD.SUCCESS);
      if (particlesRef.current) {
        if (particlesRef.current.getAnimationStatus()) {
          await particlesRef.current.refresh();
        }
        particlesRef.current.play();
      }
    },
    onError: (error) =>
      toast({ ...TOASTS.DOWNLOAD.ERROR, description: error.message }),
  });

  return (
    <>
      <div className="flex flex-wrap gap-3 items-center justify-center w-fit mx-auto">
        <Button
          onClick={() => {
            copyMutation.mutate({
              node: clipboardRef,
              exportScale,
              width,
              height,
            });
          }}
        >
          {copyMutation.isPending ? (
            <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <ClipboardIcon className="h-4 w-4 mr-2" />
          )}
          Copy to Clipboard
        </Button>
        <Button
          onClick={() => {
            downloadMutation.mutate({
              node: clipboardRef,
              exportScale,
              width,
              height,
            });
          }}
          variant="secondary"
        >
          {downloadMutation.isPending ? (
            <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <DownloadIcon className="h-4 w-4 mr-2" />
          )}
          Download
        </Button>
      </div>
    </>
  );
};
