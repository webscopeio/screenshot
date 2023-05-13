import "./globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { baseMetadata } from "@config/meta";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-100`}>
        <main className="min-h-screen flex flex-col justify-center w-full items-center px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
