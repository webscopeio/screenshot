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
        className={`${inter.className} relative bg-gradient-to-br from-indigo-800 from-10% via-purple-800 via-30% to-pink-800 to-90%`}
      >
        <main className="grid h-screen w-screen place-content-center px-8">
          <Noise />
          {children}
        </main>
      </body>
    </html>
  );
}
