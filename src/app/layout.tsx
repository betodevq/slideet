// Libraries
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Components
import Providers from "@/components/Providers";
import LanguageSelector from "@/components/LanguageSelector";
import SuspenseBoundary from "@/components/SuspenseBoundary";
import BackToMenuButton from "@/components/BackToMenuButton";

// Styles
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slideet",
  description: "A sliding puzzle game",
  icons: {
    icon: "/favicon.ico",
  },
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
              <div className="flex justify-between items-center mb-4">
                <BackToMenuButton />
                <LanguageSelector />
              </div>
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
