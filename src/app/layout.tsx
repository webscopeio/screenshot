import "./globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { baseMetadata } from "@config/meta";
import { Noise } from "@components/Noise";

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
        className={`${inter.className} bg-gradient-to-br from-indigo-900 from-10% via-purple-900 via-30% to-pink-900 to-90% relative`}
      >
        <main className="min-h-screen flex flex-col justify-center w-full items-center px-8">
          <Noise />
          {children}
        </main>
      </body>
    </html>
  );
}
