import * as React from 'react';
import { XIcon } from "lucide-react";
import { LabelTooltip } from "./LabelTooltip"
import { Settings } from "@config/defaults";
import { Input } from "@components/ui/Input"
import { Button } from "@components/ui/Button";
import { cn } from '@utils/cn';

export const BackgroundImage = ({ settings, setBackgroundImage, setBackgroundColor }: {
    settings: Settings;
    setBackgroundImage: (v: Settings['backgroundImage']) => void;
    setBackgroundColor: (v: Settings['backgroundColor']) => void;
}) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <div className="mt-1 space-y-2">
            <LabelTooltip
                htmlFor="background-image"
                tooltip="Select an image as a background"
            >
                Background Image
            </LabelTooltip>
            <div className="flex items-center">
                <Input
                    ref={inputRef}
                    accept="image/*"
                    className={cn(settings.backgroundImage && "rounded-r-none border-r-0")}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        const reader = new FileReader();
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                        reader.onload = (event) => {
                            const imageSrc = event.target?.result;
                            if (imageSrc) {
                                setBackgroundImage(imageSrc as string);
                                setBackgroundColor('bg-transparent');
                            }
                        };
                    }} id="picture" type="file" />
                {settings.backgroundImage && (
                    <Button onClick={() => {
                        if (inputRef.current) {
                            setBackgroundImage(undefined);
                            inputRef.current.value = ''
                        }
                    }} variant="ghost" className="rounded-l-none border border-l-0 border-slate-100/10 px-3 hover:bg-red-800/90"><XIcon className="h-4 w-4" /></Button>
                )}
            </div>
        </div>
    )
}