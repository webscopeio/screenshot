"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import {
  ArrowBigUp,
  DeleteIcon,
  GithubIcon,
  ImageMinusIcon,
  KeyboardIcon,
  Loader2Icon,
  MoreVerticalIcon,
  RefreshCcwIcon,
  UploadIcon,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Label } from "./ui/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Slider } from "./ui/Slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Switch } from "./ui/Switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useToast } from "@/hooks/useToast";
import { MUTATIONS, QUERIES } from "@/lib/queries";
import { config } from "@/app/settings";
import { TOASTS } from "@/app/toasts";

export const SettingsPanel: React.FC<{
  backgroundFileRef: React.RefObject<HTMLInputElement>;
}> = ({ backgroundFileRef }) => {
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
    exportScale,
    currentTab,
    setQuery,
    clearQuery,
  } = useSearchParams({
    route: config.main,
  });

  const { toast } = useToast();

  const helpRef = React.useRef<HTMLButtonElement | null>(null);

  const getBackground = useQuery({
    queryKey: [QUERIES.GET_BACKGROUND.key],
    queryFn: QUERIES.GET_BACKGROUND.fn,
  });

  const queryClient = useQueryClient();

  const addBackground = useMutation({
    mutationFn: MUTATIONS.ADD_ASSET,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.GET_BACKGROUND.key] });
      toast({
        ...TOASTS.ADD_ASSET.SUCCESS,
        description: `This ${variables.assetType} is now stored locally`,
      });
    },
    onError: (error) =>
      toast({ ...TOASTS.ADD_ASSET.ERROR, description: error.message }),
  });

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

  const isPending =
    getBackground.isLoading ||
    addBackground.isPending ||
    deleteBackground.isPending;

  return (
    <div>
      <header className="flex justify-between items-center">
        <Dialog>
          <DialogTrigger ref={helpRef} className="hidden">
            Open Keyboard Shortcuts
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Keyboard Shortcuts
                </h3>
              </DialogTitle>
              <DialogDescription className="pt-2 space-y-4">
                <p className="leading-6">
                  Manage backgrounds and clipboard images to create screenshots
                  with ease.
                </p>
                <div className="my-6 w-full overflow-y-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                          Action
                        </th>
                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                          Shortcut
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          Upload Background
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right flex items-center gap-x-1">
                          ⌘ O
                        </td>
                      </tr>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          Delete Background
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right flex items-center gap-x-1">
                          ⌘ <ArrowBigUp className="h-4 w-4" />
                          <DeleteIcon className="h-4 w-4" />
                        </td>
                      </tr>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          Paste Image
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right flex items-center gap-x-1">
                          ⌘ V
                        </td>
                      </tr>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          Delete Image
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right flex items-center gap-x-1">
                          ⌘
                          <DeleteIcon className="h-4 w-4" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="leading-6">
                  Current backgrounds and images are stored in your browser
                  using IndexDB.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <h1 className="font-semibold tracking-tight text-xl">Screenshot</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={6} align="end" className="w-48">
            <DropdownMenuRadioGroup>
              <DropdownMenuItem
                onSelect={() => helpRef.current && helpRef.current.click()}
              >
                <KeyboardIcon className="h-4 w-4 mr-2" />
                Keyboard Shortcuts
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => clearQuery()}>
                <RefreshCcwIcon className="h-4 w-4 mr-2" />
                Reset Settings
              </DropdownMenuItem>
              <Link target="_blank" href="https://github.com">
                <DropdownMenuItem>
                  <GithubIcon className="h-4 w-4 mr-2" />
                  Report Issues
                </DropdownMenuItem>
              </Link>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Accordion
        type="single"
        collapsible
        value={currentTab}
        onValueChange={(e) => setQuery({ currentTab: e as typeof currentTab })}
        className="w-full"
      >
        <AccordionItem value="layout">
          <AccordionTrigger>
            <h2 className="uppercase text-muted-foreground text-sm font-semibold tracking-wide">
              Layout
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <Label htmlFor="preset">Preset</Label>
                <Select
                  name="Preset"
                  value={
                    width && height
                      ? JSON.stringify({ width, height })
                      : undefined
                  }
                  onValueChange={(v) => {
                    const settings = JSON.parse(v) as {
                      width: typeof width;
                      height: typeof height;
                    };
                    setQuery({
                      width: settings.width,
                      height: settings.height,
                    });
                  }}
                >
                  <SelectTrigger id="preset">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        value={JSON.stringify({ width: 1200, height: 675 })}
                      >
                        Twitter Post 16:9
                      </SelectItem>
                      <SelectItem
                        value={JSON.stringify({ width: 1080, height: 1080 })}
                      >
                        Instagram Post 1:1
                      </SelectItem>
                      <SelectItem
                        value={JSON.stringify({ width: 1080, height: 1920 })}
                      >
                        Instagram Story 9:16
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-x-2 w-full">
                <div className="flex items-center gap-x-2 w-full">
                  <Label htmlFor="width">W</Label>
                  <Input
                    id="width"
                    value={width}
                    type="number"
                    onChange={(e) =>
                      setQuery({ width: parseInt(e.currentTarget.value) })
                    }
                  />
                </div>
                <div className="flex items-center gap-x-2 w-full">
                  <Label htmlFor="height">H</Label>
                  <Input
                    id="height"
                    value={height}
                    type="number"
                    onChange={(e) =>
                      setQuery({ height: parseInt(e.currentTarget.value) })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="background">Background</Label>
                <div className="flex items-center gap-x-1">
                  <p className="border-input border h-10 px-3 bg-background py-2 rounded-md w-full text-sm text-ellipsis overflow-hidden whitespace-nowrap flex gap-x-2 items-center">
                    {isPending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      getBackground.data?.file ?? "No file chosen"
                    )}
                  </p>
                  <Button
                    disabled={!getBackground.data}
                    onClick={() =>
                      deleteBackground.mutate({ assetType: "background" })
                    }
                    variant="outline"
                    size="icon"
                    className="w-12"
                  >
                    <ImageMinusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() =>
                      backgroundFileRef.current &&
                      backgroundFileRef.current.click()
                    }
                    variant="outline"
                    size="icon"
                    className="w-12"
                  >
                    <UploadIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  ref={backgroundFileRef}
                  className="hidden"
                  id="background"
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.value.split("\\").pop();
                    const fileItem = e.currentTarget.files?.item(0);
                    if (file && fileItem && fileItem.type.includes("image")) {
                      const reader = new FileReader();
                      reader.readAsDataURL(fileItem);
                      reader.onload = (e) => {
                        const src = e.target?.result as string;
                        if (src) {
                          addBackground.mutate({
                            file,
                            src,
                            assetType: "background",
                          });
                        }
                      };
                    }
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="image">
          <AccordionTrigger>
            <h2 className="uppercase text-muted-foreground text-sm font-semibold tracking-wide">
              Image
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Switch
                  checked={autoCenter}
                  onCheckedChange={(checked) =>
                    setQuery({
                      autoCenter: checked,
                    })
                  }
                  id="autoCenter"
                />
                <Label htmlFor="autoCenter">Paste image with auto-center</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <Label htmlFor="scale">Scale</Label>
                  <Input
                    className="w-24"
                    id="scale"
                    value={scale}
                    type="number"
                    onChange={(e) =>
                      setQuery({ scale: parseInt(e.currentTarget.value) })
                    }
                  />
                </div>
                <div className="pt-2">
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    defaultValue={[scale ?? 100]}
                    onValueCommit={(value) => {
                      const scale = value[0];
                      setQuery({ scale });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <Label htmlFor="positionX">Position X</Label>
                  <Input
                    className="w-24"
                    id="positionX"
                    value={positionX}
                    type="number"
                    onChange={(e) =>
                      setQuery({ positionX: parseInt(e.currentTarget.value) })
                    }
                  />
                </div>
                <div className="pt-2">
                  <Slider
                    min={-200}
                    max={200}
                    step={1}
                    defaultValue={[positionX]}
                    onValueCommit={(value) => {
                      const positionX = value[0];
                      setQuery({ positionX });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <Label htmlFor="positionY">Position Y</Label>
                  <Input
                    className="w-24"
                    id="positionY"
                    value={positionY}
                    type="number"
                    onChange={(e) =>
                      setQuery({ positionY: parseInt(e.currentTarget.value) })
                    }
                  />
                </div>
                <div className="pt-2">
                  <Slider
                    min={-200}
                    max={200}
                    step={1}
                    defaultValue={[positionY]}
                    onValueCommit={(value) => {
                      const positionY = value[0];
                      setQuery({ positionY });
                    }}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shadow">
          <AccordionTrigger>
            <h2 className="uppercase text-muted-foreground text-sm font-semibold tracking-wide">
              Shadow
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <Label htmlFor="shadowPositionX">Position X</Label>
                  <Input
                    className="w-24"
                    id="shadowPositionX"
                    value={shadowPositionX}
                    type="number"
                    onChange={(e) =>
                      setQuery({
                        shadowPositionX: parseInt(e.currentTarget.value),
                      })
                    }
                  />
                </div>
                <div className="pt-2">
                  <Slider
                    min={-200}
                    max={200}
                    step={1}
                    defaultValue={[shadowPositionX]}
                    onValueCommit={(value) => {
                      const shadowPositionX = value[0];
                      setQuery({ shadowPositionX });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <Label htmlFor="shadowPositionY">Position Y</Label>
                  <Input
                    className="w-24"
                    id="shadowPositionY"
                    value={shadowPositionY}
                    type="number"
                    onChange={(e) =>
                      setQuery({
                        shadowPositionY: parseInt(e.currentTarget.value),
                      })
                    }
                  />
                </div>
                <div className="pt-2">
                  <Slider
                    min={-200}
                    max={200}
                    step={1}
                    defaultValue={[shadowPositionY]}
                    onValueCommit={(value) => {
                      const shadowPositionY = value[0];
                      setQuery({ shadowPositionY });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <Label htmlFor="shadowBlur">Gaussian Blur</Label>
                  <Input
                    className="w-24"
                    id="shadowBlur"
                    value={shadowBlur}
                    type="number"
                    onChange={(e) =>
                      setQuery({ shadowBlur: parseInt(e.currentTarget.value) })
                    }
                  />
                </div>
                <div className="pt-2">
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    defaultValue={[shadowBlur ?? 100]}
                    onValueCommit={(value) => {
                      const shadowBlur = value[0];
                      setQuery({ shadowBlur });
                    }}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="export">
          <AccordionTrigger>
            {" "}
            <h2 className="uppercase text-muted-foreground text-sm font-semibold tracking-wide">
              Export
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exportScale">Scale</Label>
                <Select
                  name="Export Scale"
                  value={`${exportScale}`}
                  onValueChange={(v) => {
                    setQuery({
                      exportScale: parseFloat(v) as typeof exportScale,
                    });
                  }}
                >
                  <SelectTrigger id="exportScale">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"1"}>1x</SelectItem>
                      <SelectItem value={"1.5"}>1.5x</SelectItem>
                      <SelectItem value={"2"}>2x</SelectItem>
                      <SelectItem value={"3"}>3x</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
