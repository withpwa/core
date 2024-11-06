import { Transform, TransformCallback } from "stream";
import { type PWAsOptions, defaultOptions } from "./config/defaults";
import type { PlatformName } from "./platforms/index";
import { sourceImages } from "./helpers";
import { getPlatform } from "./platforms/index";

export { PWAsOptions, PlatformName };

export interface PWAsImage {
  readonly name: string;
  readonly contents: Buffer;
}

export interface PWAsFile {
  readonly name: string;
  readonly contents: string;
}

export const config = {
  defaults: defaultOptions,
};

export type FaviconHtmlElement = string;

export interface PWAsResponse {
  readonly images: PWAsImage[];
  readonly files: PWAsFile[];
  readonly html: FaviconHtmlElement[];
}

export async function compose(
  source: string | Buffer | (string | Buffer)[],
  options: PWAsOptions = { name: "null" },
): Promise<PWAsResponse> {
  options = {
    ...defaultOptions,
    ...options,
    icons: { ...defaultOptions.icons, ...options.icons },
    output: { ...defaultOptions.output, ...options.output },
  };

  const sourceset = await sourceImages(source);

  const platforms = Object.keys(options.icons)
    .filter((platform) => options.icons[platform])
    .sort((a, b) => {
      if (a === "favicons") return -1;
      if (b === "favicons") return 1;
      return a.localeCompare(b);
    });

  const responses: PWAsResponse[] = [];

  for (const platformName of platforms) {
    const platform = getPlatform(platformName, options);

    responses.push(await platform.create(sourceset));
  }

  return {
    images: responses.flatMap((r) => r.images),
    files: responses.flatMap((r) => r.files),
    html: responses.flatMap((r) => r.html),
  };
}

export default compose;

export interface composeStreamOptions extends PWAsOptions {
  readonly html?: string;
  readonly pipeHTML?: boolean;
  readonly emitBuffers?: boolean;
}

export type HandleHTML = (html: FaviconHtmlElement[]) => void;

class composeStream extends Transform {
  #options: composeStreamOptions;
  #handleHTML: HandleHTML;

  constructor(options: composeStreamOptions, handleHTML: HandleHTML) {
    super({ objectMode: true });
    this.#options = options;
    this.#handleHTML = handleHTML;
  }

  override _transform(
    file: string | Buffer | (string | Buffer)[],
    _encoding: BufferEncoding,
    callback: TransformCallback,
  ) {
    const { html: htmlPath, pipeHTML, ...options } = this.#options;

    compose(file, options)
      .then(({ images, files, html }) => {
        for (const { name, contents } of [...images, ...files]) {
          this.push({
            name,
            contents: this.#convertContent(contents),
          });
        }

        if (this.#handleHTML) {
          this.#handleHTML(html);
        }

        if (pipeHTML) {
          this.push({
            name: htmlPath,
            contents: this.#convertContent(html.join("\n")),
          });
        }

        callback(null);
      })
      .catch(callback);
  }

  #convertContent(contents: string | Buffer): string | Buffer {
    return (this.#options.emitBuffers ?? true) && !Buffer.isBuffer(contents)
      ? Buffer.from(contents)
      : contents;
  }
}

export function stream(options: composeStreamOptions, handleHTML: HandleHTML) {
  return new composeStream(options, handleHTML);
}
