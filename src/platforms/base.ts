import {
  PWAsFile,
  FaviconHtmlElement,
  PWAsImage,
  PWAsResponse,
} from "../index";
import { PWAsOptions, IconOptions, NamedIconOptions } from "../config/defaults";
import { asString, createFavicon, relativeTo, SourceImage } from "../helpers";

export interface OptionalMixin {
  readonly optional?: boolean;
}

export function uniformIconOptions<T extends NamedIconOptions>(
  options: PWAsOptions,
  iconsChoice:
    | IconOptions
    | boolean
    | (string | NamedIconOptions)[]
    | undefined,
  platformConfig: (T & OptionalMixin)[],
): T[] {
  let result = [];
  if (Array.isArray(iconsChoice)) {
    const iconsChoices = Object.fromEntries(
      iconsChoice.map((choice) =>
        typeof choice === "object"
          ? [choice.name, choice]
          : [choice, { name: choice }],
      ),
    );
    result = platformConfig
      .filter((iconOptions) => iconOptions.name in iconsChoices)
      .map((iconOptions) => ({
        ...iconOptions,
        ...iconsChoices[iconOptions.name],
      }));
  } else if (typeof iconsChoice === "object") {
    result = platformConfig
      .filter((iconOptions) => !iconOptions.optional)
      .map((iconOptions) => ({
        ...iconOptions,
        ...iconsChoice,
      }));
  } else {
    result = platformConfig.filter((iconOptions) => !iconOptions.optional);
  }

  return result.map((iconOptions) => ({
    pixelArt: options.pixel_art,
    ...iconOptions,
    background:
      iconOptions.background === true
        ? options.background
        : asString(iconOptions.background),
  }));
}

export class Platform<IO extends NamedIconOptions = NamedIconOptions> {
  protected options: PWAsOptions;
  protected iconOptions: IO[];

  constructor(options: PWAsOptions, iconOptions: IO[]) {
    this.options = options;
    this.iconOptions = iconOptions;
  }

  async create(sourceset: SourceImage[]): Promise<PWAsResponse> {
    const { output } = this.options;
    return {
      images: output.images ? await this.createImages(sourceset) : [],
      files: output.files ? await this.createFiles() : [],
      html: output.html ? await this.createHtml() : [],
    };
  }

  async createImages(sourceset: SourceImage[]): Promise<PWAsImage[]> {
    return await Promise.all(
      this.iconOptions.map((iconOption) =>
        createFavicon(sourceset, iconOption.name, iconOption),
      ),
    );
  }

  async createFiles(): Promise<PWAsFile[]> {
    return [];
  }

  async createHtml(): Promise<FaviconHtmlElement[]> {
    return [];
  }

  protected relative(path: string): string {
    return relativeTo(this.options.output.assetsPrefix, path);
  }

  protected cacheBusting(path: string): string {
    if (typeof this.options.cacheBustingQueryParam !== "string") {
      return path;
    }

    const paramParts = this.options.cacheBustingQueryParam.split("=");

    if (paramParts.length === 1) {
      return path;
    }

    const url = new URL(path, "https://cache.busting");
    url.searchParams.set(paramParts[0], paramParts.slice(1).join("="));
    return url.origin === "https://cache.busting"
      ? url.pathname + url.search
      : url.toString();
  }
}
