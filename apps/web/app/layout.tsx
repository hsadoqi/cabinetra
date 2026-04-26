import "./globals.css";

import { AppHeader } from "@/components/app-header/app-header";
import { ClientSwitcherRoot } from "@/components/client-switcher-root";
import {
  DEFAULT_LOCALE,
  getLocaleDirection,
  isLocale,
  LOCALE_COOKIE_NAME,
  localeDefinitions,
  type Locale,
} from "@cabinetra/platform-i18n";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Script from "next/script";
import type { Theme } from "@cabinetra/ui-components/providers";
import { getThemeBootstrapScript } from "@cabinetra/ui-components/lib/theme-bootstrap";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Inter, Noto_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import { cn } from "@cabinetra/ui-components/lib/utils";

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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-latin",
  display: "swap",
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans-arabic",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Cabinetra",
  description: "Cabinetra web application",
};

const themeScript = getThemeBootstrapScript({
  localeCookieName: LOCALE_COOKIE_NAME,
  defaultLocale: DEFAULT_LOCALE,
  locales: localeDefinitions.map((locale) => locale.code),
});

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
      className={cn(
        "bg-background text-foreground",
        inter.variable,
        notoArabic.variable,
        jetbrainsMono.variable,
        {
          "dark": initialTheme === "dark",
        })}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}>
        <Providers initialTheme={initialTheme} initialLocale={initialLocale}>
          <AppHeader />
          <main className="flex-1 min-h-0 overflow-hidden mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">{children}</main>
          <ClientSwitcherRoot />
        </Providers>
      </body>
    </html>
  );
}
