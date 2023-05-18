import * as React from "react";
import { useOS } from "@hooks/useOS";
import { useTimeout } from "@hooks/useTimeout";

export const LoadProvider = ({ children }: { children: React.ReactNode }) => {
  const os = useOS();

  const [isReady, setIsReady] = React.useState(false);

  const timeout = useTimeout(() => setIsReady(true), 1000);
  timeout.call();

  if (os === "undetermined" || !isReady) {
    return (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }

  if (os === "android" || os === "ios") {
    return (
      <h2 className="text-3xl font-bold text-violet-300 text-center">
        Sorry! Screenshot doesn&apos;t have support for mobile view.
      </h2>
    );
  }

  return <>{children}</>;
};
