interface ThemeBootstrapOptions {
    localeCookieName?: string
    defaultLocale?: string
    locales?: string[]
}

export function getThemeBootstrapScript(options: ThemeBootstrapOptions = {}) {
    const {
        localeCookieName,
        defaultLocale,
        locales,
    } = options

    const localeConfig =
        localeCookieName && defaultLocale && locales && locales.length > 0
            ? {
                localeCookieName,
                defaultLocale,
                locales,
            }
            : null

    return `
  (() => {
    const getCookie = (name) => document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(name + "="))
      ?.split("=")[1];

    const root = document.documentElement;
    const cookieTheme = getCookie("theme");
    const theme = cookieTheme === "light" || cookieTheme === "dark" || cookieTheme === "system"
      ? cookieTheme
      : "system";
    const resolvedTheme = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;

    root.classList.toggle("dark", resolvedTheme === "dark");

    const localeConfig = ${JSON.stringify(localeConfig)};

    if (localeConfig) {
      const cookieLocale = getCookie(localeConfig.localeCookieName);
      const locale = localeConfig.locales.includes(cookieLocale)
        ? cookieLocale
        : localeConfig.defaultLocale;

      root.lang = locale;
      root.dir = locale === "ar" ? "rtl" : "ltr";
    }
  })();
`
}