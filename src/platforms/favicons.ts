import { FaviconHtmlElement } from "../index";
import { PWAsOptions, NamedIconOptions } from "../config/defaults";
import { transparentIcon, transparentIcons } from "../config/icons";
import { OptionalMixin, Platform, uniformIconOptions } from "./base";

const ICONS_OPTIONS: (NamedIconOptions & OptionalMixin)[] = [
  { name: "favicon.ico", ...transparentIcons(16, 24, 32, 48, 64) },
  { name: "favicon-16x16.png", ...transparentIcon(16) },
  { name: "favicon-32x32.png", ...transparentIcon(32) },
  { name: "favicon-48x48.png", ...transparentIcon(48) },
  { name: "favicon.svg", ...transparentIcon(1024) },
];

export class FaviconsPlatform extends Platform {
  constructor(options: PWAsOptions) {
    super(
      options,
      uniformIconOptions(options, options.icons.favicons, ICONS_OPTIONS),
    );
  }

  override async createHtml(): Promise<FaviconHtmlElement[]> {
    return this.iconOptions.map(({ name, ...options }) => {
      if (name.endsWith(".ico")) {
        return `<link rel="icon" type="image/x-icon" href="${this.cacheBusting(this.relative(name))}">`;
      } else if (name.endsWith(".svg")) {
        return `<link rel="icon" type="image/svg+xml" href="${this.cacheBusting(this.relative(name))}">`;
      }
      const { width, height } = options.sizes[0];
      return `<link rel="icon" type="image/png" sizes="${width}x${height}" href="${this.cacheBusting(this.relative(name))}">`;
    });
  }
}
