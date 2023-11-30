import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers/Providers";

const inter = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usescreenshot.app"),
  title: "Screenshot",
  description:
    "Manage backgrounds and clipboard images to create screenshots with ease.",
  keywords: ["screenshot", "react", "typescript"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black`}>
        <LayoutGrid />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

const LayoutGrid = () => (
  <svg
    className="absolute -z-10 h-full w-full text-muted"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="smallGrid"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 10 0 L 0 0 0 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </pattern>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#smallGrid)" />
        <path
          d="M 100 0 L 0 0 0 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect className="h-full w-full" fill="url(#grid)" />
  </svg>
);
