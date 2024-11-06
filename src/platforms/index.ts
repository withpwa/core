import { PWAsOptions } from "../config/defaults";
import { Platform } from "./base";
import { PWAsPlatform } from "./pwa";
import { AppleIconPlatform } from "./apple/icon";
import { AppleStartupPlatform } from "./apple/starup";
import { FaviconsPlatform } from "./favicons";
import { YandexPlatform } from "./yandex";
import { WindowsPlatform } from "./windows";

export type PlatformName =
  | "pwaIcon"
  | "appleIcon"
  | "appleStartup"
  | "favicons"
  | "windowsTile"
  | "yandex";

export function getPlatform(name: string, options: PWAsOptions): Platform {
  switch (name) {
    case "pwaIcon":
      return new PWAsPlatform(options);
    case "appleIcon":
      return new AppleIconPlatform(options);
    case "appleStartup":
      return new AppleStartupPlatform(options);
    case "favicons":
      return new FaviconsPlatform(options);
    case "windowsTile":
      return new WindowsPlatform(options);
    case "yandex":
      return new YandexPlatform(options);
    default:
      throw new Error(`Unsupported platform ${name}`);
  }
}
