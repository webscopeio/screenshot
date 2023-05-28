import { Info } from "lucide-react";
import { Label } from "@components/ui/Label";
import { Tooltip } from "@components/ui/Tooltip";

export const LabelTooltip = ({
  children,
  htmlFor,
  tooltip,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  tooltip?: string;
}) => {
  return (
    <Label htmlFor={htmlFor}>
      <span>{children}</span>
      {tooltip && (
        <Tooltip content={<p>{tooltip}</p>} side="top">
          <Info className="h-4 w-4 cursor-help stroke-slate-200/90" />
        </Tooltip>
      )}
    </Label>
  );
};
