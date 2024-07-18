import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <section className="max-w-screen-lg p-8 mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-center">
              Slideet
            </h1>
            {children}
          </section>
        </Provider>
      </body>
    </html>
  );
}
