import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import LanguageSelector from "@/components/LanguageSelector";
import SuspenseBoundary from "@/components/SuspenseBoundary";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slideet",
  description: "A sliding puzzle game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SuspenseBoundary>
            <section className="max-w-screen-lg p-8 mx-auto">
              <LanguageSelector />
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-center">
                Slideet
              </h1>
              {children}
            </section>
          </SuspenseBoundary>
        </Providers>
      </body>
    </html>
  );
}
