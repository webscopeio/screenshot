"use client";

import * as React from "react";
import { useToast } from "@hooks/useToast";
import {
  ToastProvider as ToastWrapper,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "../ui/Toast";

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toasts } = useToast();

  return (
    <ToastWrapper>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      {children}
      <ToastViewport />
    </ToastWrapper>
  );
};
