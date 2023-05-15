import { Check, Loader2, X } from "lucide-react";
import { Button, ButtonProps } from "./ui/Button";
import { ImageRendererState } from "@hooks/useImageRenderer";

export const ActionButton = ({
  state,
  onClick,
  icon,
  children,
  variant = "default",
}: {
  state: keyof typeof ImageRendererState;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
}) => {
  return (
    <Button
      disabled={state === "LOADING"}
      variant={variant}
      className="gap-2"
      onClick={onClick}
    >
      {state === "LOADING" && <Loader2 className="h-5 w-5 animate-spin" />}
      {state === "SUCCESS" && <Check className="h-5 w-5 text-green-700" />}
      {state === "ERROR" && <X className="h-5 w-5 text-red-700" />}
      {state === "READY" && icon}
      {children}
    </Button>
  );
};
