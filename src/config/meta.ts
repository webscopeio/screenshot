import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://screenshot-ekqt.vercel.app/"),
  title: "Screenshot",
  description: "Build engaging screenshots faster",
  openGraph: {
    title: "Screenshot",
    description: "Build engaging screenshots faster",
    url: "https://screenshot-ekqt.vercel.app/",
    siteName: "Screenshot",
    locale: "en-US",
    type: "website",
  },
};
