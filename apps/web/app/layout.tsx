import "./globals.css";

import { AppHeader } from "@/components/app-header/app-header";
import {
  DEFAULT_LOCALE,
  getLocaleDirection,
  isLocale,
  LOCALE_COOKIE_NAME,
  type Locale,
} from "@cabinetra/platform-i18n";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Script from "next/script";
import type { Theme } from "@cabinetra/ui-components/providers";
import { cookies } from "next/headers";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const FALLBACK_THEME: Theme = "system";
const FALLBACK_LOCALE: Locale = DEFAULT_LOCALE;

function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export const metadata: Metadata = {
  title: "Cabinetra",
  description: "Cabinetra web application",
};

const themeScript = `
  (() => {
    const getCookie = (name) => document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(name + "="))
      ?.split("=")[1];
    const root = document.documentElement;
    const cookieTheme = getCookie("theme");
    const cookieLocale = getCookie("${LOCALE_COOKIE_NAME}");
    const theme = cookieTheme === "light" || cookieTheme === "dark" || cookieTheme === "system"
      ? cookieTheme
      : "system";
    const locale = cookieLocale === "fr" || cookieLocale === "en" || cookieLocale === "ar"
      ? cookieLocale
      : "${DEFAULT_LOCALE}";
    const resolvedTheme = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const initialTheme = isTheme(themeCookie)
    ? themeCookie
    : FALLBACK_THEME;
  const initialLocale = isLocale(localeCookie)
    ? localeCookie
    : FALLBACK_LOCALE;

  return (
    <html
      lang={initialLocale}
      dir={getLocaleDirection(initialLocale)}
      className={initialTheme === "dark" ? "dark" : undefined}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers initialTheme={initialTheme} initialLocale={initialLocale}>
          <AppHeader />
          <main className="mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
