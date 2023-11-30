"use client";

import * as React from "react";
import Particles from "react-particles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { Container } from "tsparticles-engine";
import { ActionsPanel } from "@/components/ActionsPanel";
import { MainPanel } from "@/components/MainPanel";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function Home() {
  const clipboardRef = React.useRef<HTMLDivElement | null>(null);
  const backgroundFileRef = React.useRef<HTMLInputElement | null>(null);
  const particlesRef = React.useRef<Container | null>(null);

  return (
    <main className="flex h-screen">
      <Particles
        className="absolute"
        init={async (engine) => await loadConfettiPreset(engine)}
        loaded={async (container) => {
          if (container) {
            particlesRef.current = container;
          }
        }}
        options={{
          autoPlay: false,
          pauseOnBlur: false,
          pauseOnOutsideViewport: false,
          emitters: [
            {
              size: {
                width: 100,
                height: 50,
              },
              startCount: 650,
              life: {
                duration: 5,
                count: 1,
              },
              position: {
                x: 50,
                y: 0,
              },
              particles: {
                move: {
                  direction: "bottom",
                },
              },
            },
          ],
          preset: "confetti",
        }}
      />
      <div className="flex-1 p-6 relative">
        <div className="absolute -translate-x-1/2 left-[50%] top-6 z-50">
          <ActionsPanel
            particlesRef={particlesRef}
            clipboardRef={clipboardRef}
          />
        </div>
        <MainPanel
          clipboardRef={clipboardRef}
          backgroundFileRef={backgroundFileRef}
        />
      </div>
      <div className="min-w-3xl h-full w-[calc(max(240px,_25%))] p-6 backdrop-blur bg-background/30 overflow-scroll hidden md:block">
        <SettingsPanel backgroundFileRef={backgroundFileRef} />
      </div>
    </main>
  );
}
