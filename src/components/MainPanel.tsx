"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import useMeasure from "react-use-measure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowBigUp, DeleteIcon, Loader2Icon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./ui/ContextMenu";
import { config } from "@/app/settings";
import { useHotkeys } from "@/hooks/useHotkeys";
import { cn } from "@/lib/utils";
import { MUTATIONS, QUERIES } from "@/lib/queries";
import { useToast } from "@/hooks/useToast";
import { TOASTS } from "@/app/toasts";
import { pasteImage } from "@/lib/clipboard";

export const MainPanel: React.FC<{
  clipboardRef: React.RefObject<HTMLDivElement>;
  backgroundFileRef: React.RefObject<HTMLInputElement>;
}> = ({ clipboardRef, backgroundFileRef }) => {
  const [ref, bounds] = useMeasure();
  const {
    width,
    height,
    autoCenter,
    scale,
    positionX,
    positionY,
    shadowPositionX,
    shadowPositionY,
    shadowBlur,
  } = useSearchParams({
    route: config.main,
  });

  const { toast } = useToast();

  const getBackground = useQuery({
    queryKey: [QUERIES.GET_BACKGROUND.key],
    queryFn: QUERIES.GET_BACKGROUND.fn,
  });

  const queryClient = useQueryClient();

  const deleteBackground = useMutation({
    mutationFn: MUTATIONS.DELETE_ASSET,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.GET_BACKGROUND.key] });
      toast({
        ...TOASTS.DELETE_ASSET.SUCCESS,
        description: `The ${variables.assetType} has been deleted`,
      });
    },
    onError: (error) =>
      toast({ ...TOASTS.DELETE_ASSET.ERROR, description: error.message }),
  });

  const getImage = useQuery({
    queryKey: [QUERIES.GET_IMAGE.key],
    queryFn: QUERIES.GET_IMAGE.fn,
  });

  const addImage = useMutation({
    mutationFn: MUTATIONS.ADD_ASSET,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.GET_IMAGE.key] });
      toast({
        ...TOASTS.ADD_ASSET.SUCCESS,
        description: `This ${variables.assetType} is now stored locally`,
      });
    },
    onError: (error) =>
      toast({ ...TOASTS.ADD_ASSET.ERROR, description: error.message }),
  });

  const deleteImage = useMutation({
    mutationFn: MUTATIONS.DELETE_ASSET,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.GET_IMAGE.key] });
      toast({
        ...TOASTS.DELETE_ASSET.SUCCESS,
        description: `The ${variables.assetType} has been deleted`,
      });
    },
    onError: (error) =>
      toast({ ...TOASTS.DELETE_ASSET.ERROR, description: error.message }),
  });

  const getImageFromClipboard = React.useCallback(async () => {
    const res = await pasteImage({ center: autoCenter });
    if ("src" in res) {
      const { src, width, height } = res;
      addImage.mutate({
        assetType: "image",
        file: "clipboard",
        src,
        width,
        height,
      });
    }
    if ("error" in res) {
      toast({ ...TOASTS.ADD_ASSET.ERROR, description: res.error });
    }
  }, [addImage, toast, autoCenter]);

  useHotkeys([
    [
      "mod+O",
      () => backgroundFileRef.current && backgroundFileRef.current.click(),
    ],
    [
      "mod+Shift+Backspace",
      () => deleteBackground.mutate({ assetType: "background" }),
    ],
    ["mod+V", getImageFromClipboard],
    ["mod+Backspace", () => deleteImage.mutate({ assetType: "image" })],
  ]);

  const backgroundScale = React.useMemo(() => {
    const widthScale = Math.min(1, bounds.width / width);
    const heightScale = Math.min(1, bounds.height / height);
    return Math.min(widthScale, heightScale);
  }, [bounds.height, bounds.width, height, width]);

  const imageScale = React.useMemo(() => {
    const image = getImage.data;
    if (!image) return null;
    const widthScale = Math.min(1, width / image.width);
    const heightScale = Math.min(1, height / image.height);
    return Math.min(widthScale, heightScale);
  }, [height, width, getImage.data]);

  const isPending =
    getImage.isLoading || addImage.isPending || deleteImage.isPending;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          ref={ref}
          className="h-full w-full flex items-center justify-center relative"
        >
          {getBackground.isLoading && (
            <Loader2Icon className="animate-spin h-12 w-12" />
          )}

          {getBackground.data && (
            <div
              ref={clipboardRef}
              style={{
                backgroundImage: `url(${getBackground.data.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                width,
                height,
                transform: `scale(${backgroundScale})`,
                top: `calc(50% - ${height / 2}px)`,
                left: `calc(50% - ${width / 2}px)`,
                overflow: "hidden",
                position: "absolute",
              }}
            >
              {isPending && (
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  <Loader2Icon className="animate-spin h-12 w-12" />
                </div>
              )}
              <AnimatePresence>
                {getImage.data && imageScale && (
                  <motion.img
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    animate={{
                      opacity: 1,
                      top: `calc(50% - ${
                        (getImage.data.height * imageScale) / 2 +
                        (positionY ?? 0)
                      }px)`,
                      left: `calc(50% - ${
                        (getImage.data.width * imageScale) / 2 -
                        (positionX ?? 0)
                      }px)`,
                      filter: `drop-shadow(${shadowPositionX}px ${shadowPositionY}px ${shadowBlur}px rgb(0 0 0 / 0.75))`,
                      position: "absolute",
                      transform: `scale(${scale / 100})`,
                    }}
                    alt="Image"
                    src={getImage.data.src}
                    width={getImage.data.width * imageScale}
                    height={getImage.data.height * imageScale}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
          {!getBackground.isLoading &&
            !isPending &&
            (!getImage.data || !getBackground.data) && (
              <div
                className={cn(
                  "top-[50%] left-[50%] absolute p-6 -translate-x-[50%] -translate-y-[50%] flex w-[min(85%,_420px)] aspect-video items-center justify-center text-2xl font-medium rounded-md border-4 border-dashed text-center",
                  "mix-blend-overlay text-foreground border-foreground flex flex-col gap-y-2",
                  !getBackground.data &&
                    "mix-blend-difference text-muted-foreground border-muted-foreground"
                )}
              >
                Right click here
              </div>
            )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          inset
          onClick={() =>
            backgroundFileRef.current && backgroundFileRef.current.click()
          }
        >
          Upload Background
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          disabled={!getBackground.data}
          onClick={() => deleteBackground.mutate({ assetType: "background" })}
        >
          Delete Background
          <ContextMenuShortcut className="flex items-center">
            ⌘ <ArrowBigUp className="h-4 w-4" />
            <DeleteIcon className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          inset
          disabled={!getBackground.data}
          onClick={() => getImageFromClipboard()}
        >
          Paste Image
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          disabled={!getImage.data}
          onClick={() => deleteImage.mutate({ assetType: "image" })}
        >
          Delete Image
          <ContextMenuShortcut className="flex items-center">
            ⌘ <DeleteIcon className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
