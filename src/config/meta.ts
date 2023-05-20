import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://screenshot-ekqt.vercel.app/"),
  title: "Screenshot",
  description: "Build engaging screenshots faster",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Screenshot",
    description: "Build engaging screenshots faster",
    images: ["/home.png"],
    url: "https://screenshot-ekqt.vercel.app/",
    siteName: "Screenshot",
    locale: "en-US",
    type: "website",
  },
};
