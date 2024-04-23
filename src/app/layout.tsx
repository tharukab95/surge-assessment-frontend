import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../utils/Providers";
import SessionProviders from "@/utils/SessionProvider";
import AppBar from "./components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laureates Website",
  description: "A website filled with laureates content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SessionProviders>
          <Providers>
            <AppBar />
            <div className={inter.className}>{children}</div>
          </Providers>
        </SessionProviders>
      </body>
    </html>
  );
}
