import { LabelTooltip } from "./LabelTooltip"
import { Settings } from "@config/defaults";
import { Input } from "@components/ui/Input"

export const BackgroundImage = ({ setBackgroundImage, setBackgroundColor }: {
    setBackgroundImage: (v: Settings['backgroundImage']) => void;
    setBackgroundColor: (v: Settings['backgroundColor']) => void;
}) => {
    return (
        <div className="mt-3 space-y-2">
            <LabelTooltip
                htmlFor="background-image"
                tooltip="Select an image as a background"
            >
                Background Image
            </LabelTooltip>
            <Input accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                const reader = new FileReader();

                reader.onload = (event) => {
                    const imageSrc = event.target?.result;
                    if (imageSrc) {
                        setBackgroundImage(imageSrc as string);
                        setBackgroundColor('bg-transparent');
                    }
                };

                if (file) {
                    reader.readAsDataURL(file);
                }

            }} id="picture" type="file" />
        </div>
    )
}