type DeepKeys<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${Prefix}${K & string}.${DeepKeys<T[K], "">}`
        : `${Prefix}${K & string}`;
    }[keyof T]
  : never;

class MinimalIntl<TLocales extends Record<string, Record<string, any>>> {
  private locales: TLocales;
  private currentLocale: keyof TLocales;

  constructor(locales: TLocales, defaultLocale: keyof TLocales) {
    if (!(defaultLocale in locales)) {
      throw new Error(
        `Default locale "${String(defaultLocale)}" is not in locales`
      );
    }
    this.locales = locales;
    this.currentLocale = defaultLocale;
  }

  get<K extends DeepKeys<TLocales[keyof TLocales]>>(
    key: K,
    params?: Record<string, string | number>
  ): string {
    const localeObject = this.locales[this.currentLocale];

    let result: string | undefined = key
      .split(".")
      .reduce(
        (obj: any, part) =>
          obj && typeof obj === "object" ? obj[part] : undefined,
        localeObject
      );

    if (typeof result !== "string") {
      return key; // Fallback to key if translation is missing
    }

    if (params) {
      for (const paramKey of Object.keys(params)) {
        result = result.replace(
          new RegExp(`{{${paramKey}}}`, "g"),
          String(params[paramKey])
        );
      }
    }

    return result;
  }

  setLocale(locale: keyof TLocales): void {
    if (locale in this.locales) {
      this.currentLocale = locale;
    } else {
      console.warn(
        `Locale "${String(locale)}" not found, falling back to "${String(
          this.currentLocale
        )}".`
      );
    }
  }

  getLocale(): keyof TLocales {
    return this.currentLocale;
  }
}

export function initIntl<TLocales extends Record<string, Record<string, any>>>(
  locales: TLocales,
  defaultLocale: keyof TLocales
) {
  return new MinimalIntl(locales, defaultLocale);
}
