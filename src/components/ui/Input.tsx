import * as React from "react";
import { cn } from "@utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-slate-100/10 bg-transparent px-2.5 py-2 text-sm ring-offset-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-100/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/25 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          type === "color" && "cursor-pointer py-1.5",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
