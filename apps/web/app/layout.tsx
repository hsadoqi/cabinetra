import "./globals.css";

import { AppHeader } from "@/components/app-header";
import type { Metadata } from "next";
import { Providers } from "./providers";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Cabinetra",
  description: "Cabinetra web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AppHeader />
          <main className="mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
