# Progressive Web Applications: Toolkits
<!-- [![NPM version](https://img.shields.io/npm/v/favicons.svg)](https://www.npmjs.org/package/@pwas/core) -->

[![Build Status](https://github.com/itgalaxy/favicons/actions/workflows/ci.yml/badge.svg)](https://github.com/itgalaxy/favicons/actions/workflows/ci.yml)

A **Node.js module** for generating progressive web applications (PWAs) assets and their associated files. Originally built for [Google's Web Starter Kit](https://github.com/google/web-starter-kit) and [Catalyst](https://github.com/haydenbleasel/catalyst). Installed through NPM with:

```
npm install @pwaset/core
```

> [!NOTE]
>
> Thanks to [favicons](https://github.com/itgalaxy/favicons) for open source, this is just an improved version: redesigned interface and more complete support (`themes` for user's prefers color scheme, `icons`,`manifest` ([w3org](https://www.w3.org/TR/appmanifest/#web-application-manifest), Edge), `screenshots`, `*_localized` etc.)

## Usage

<details>
<summary>Getting stared</summary>

To use `@pwaset/core`, require the corresponding module and call it, optionally specifying a configuration and callback object. A full list of options can be found in the [`test/createExamples`](test/createExamples.mjs) folder or refer to the JSDoc support.

`@pwas/core` generates its PWA assets locally using pure Javascript, without any external dependencies.

> Please note: the package are tested on Node 14 and above.

</details>

<details>
<summary>The default sources are as follow (groupped by platform):</summary>

```json
{
  "pwaIcon": [
    "android-chrome-144x144.png",
    "android-chrome-192x192.png",
    "android-chrome-256x256.png",
    "android-chrome-36x36.png",
    "android-chrome-384x384.png",
    "android-chrome-48x48.png",
    "android-chrome-512x512.png",
    "android-chrome-72x72.png",
    "android-chrome-96x96.png",
    "manifest.webmanifest"
  ],
  "appleIcon": [
    "apple-touch-icon-1024x1024.png",
    "apple-touch-icon-114x114.png",
    "apple-touch-icon-120x120.png",
    "apple-touch-icon-144x144.png",
    "apple-touch-icon-152x152.png",
    "apple-touch-icon-167x167.png",
    "apple-touch-icon-180x180.png",
    "apple-touch-icon-57x57.png",
    "apple-touch-icon-60x60.png",
    "apple-touch-icon-72x72.png",
    "apple-touch-icon-76x76.png",
    "apple-touch-icon-precomposed.png",
    "apple-touch-icon.png",
    "safari-pinned-tab.svg"
  ],
  "appleStartup": [
    "apple-touch-startup-image-640x1136.png",
    "apple-touch-startup-image-750x1334.png",
    "apple-touch-startup-image-828x1792.png",
    "apple-touch-startup-image-1125x2436.png",
    "apple-touch-startup-image-1136x640.png",
    "apple-touch-startup-image-1170x2532.png",
    "apple-touch-startup-image-1179x2556.png",
    "apple-touch-startup-image-1242x2208.png",
    "apple-touch-startup-image-1242x2688.png",
    "apple-touch-startup-image-1284x2778.png",
    "apple-touch-startup-image-1290x2796.png",
    "apple-touch-startup-image-1334x750.png",
    "apple-touch-startup-image-1488x2266.png",
    "apple-touch-startup-image-1536x2048.png",
    "apple-touch-startup-image-1620x2160.png",
    "apple-touch-startup-image-1640x2160.png",
    "apple-touch-startup-image-1668x2224.png",
    "apple-touch-startup-image-1668x2388.png",
    "apple-touch-startup-image-1792x828.png",
    "apple-touch-startup-image-2048x1536.png",
    "apple-touch-startup-image-2048x2732.png",
    "apple-touch-startup-image-2160x1620.png",
    "apple-touch-startup-image-2160x1640.png",
    "apple-touch-startup-image-2208x1242.png",
    "apple-touch-startup-image-2224x1668.png",
    "apple-touch-startup-image-2266x1488.png",
    "apple-touch-startup-image-2388x1668.png",
    "apple-touch-startup-image-2436x1125.png",
    "apple-touch-startup-image-2532x1170.png",
    "apple-touch-startup-image-2556x1179.png",
    "apple-touch-startup-image-2688x1242.png",
    "apple-touch-startup-image-2732x2048.png",
    "apple-touch-startup-image-2778x1284.png",
    "apple-touch-startup-image-2796x1290.png",
  ],
  "favicons": [
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon-48x48.png",
    "favicon.ico",
    "favicon.svg",
  ],
  "windows": [
    "mstile-144x144.png",
    "mstile-150x150.png",
    "mstile-310x150.png",
    "mstile-310x310.png",
    "mstile-70x70.png"
    "browserconfig.xml"
  ],
  "yandex": [
    "yandex-browser-50x50.png",
    "yandex-browser-manifest.json"
  ]
}
```

</details>

## License

MIT
