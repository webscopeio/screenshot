import { Label } from "@components/ui/Label";
import { Switch } from "@components/ui/Switch";
import { Settings } from "@config/defaults";

export const Shadows = ({
  toggleShadows,
}: {
  toggleShadows: (v: Settings["enableShadows"]) => void;
}) => {
  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center gap-2">
        <Switch
          id="shadow"
          onCheckedChange={(v: boolean) => toggleShadows(v)}
        />
        <Label htmlFor="shadow">Enable Shadows</Label>
      </div>
    </div>
  );
};
