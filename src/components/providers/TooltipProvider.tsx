"use client";

import * as React from "react";
import { TooltipProvider as TooltipWrapper } from "@components/ui/Tooltip";

export const TooltipProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <TooltipWrapper delayDuration={350}>{children}</TooltipWrapper>;
};
