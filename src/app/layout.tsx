import "./globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { baseMetadata } from "@config/meta";
import { Grid } from "@components/Grid";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black`}
      >
        <Grid className="text-slate-800" />
        <main className="grid h-screen w-screen place-content-center px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
