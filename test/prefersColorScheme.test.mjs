import compose from "../src";
import { logo_png } from "./util";

test("manifest should support user's prefer color scheme", async () => {
  expect.assertions(3);

  const result = await compose(logo_png, {
    themes: ["#fff", "#000"],
    icons: {
      pwaIcon: ["icon-192x192.png"],
      appleIcon: false,
      appleStartup: false,
      favicons: false,
      windowsTile: false,
      yandex: false,
    },
  });

  const manifestFile = result.files.find(
    (file) => file.name === "manifest.webmanifest",
  );

  const manifest = JSON.parse(manifestFile.contents);

  await expect(result).toMatchComposeSnapshot();

  expect(result.html).toEqual(
    expect.arrayContaining([
      expect.stringContaining("theme-color"),
      expect.stringContaining("prefers-color-scheme: light"),
      expect.stringContaining("#fff"),
      expect.stringContaining("prefers-color-scheme: dark"),
      expect.stringContaining("#000"),
    ]),
  );

  expect(manifest.theme_color).toBe(
    "#fff",
    "Expected theme_color in manifest.webmanifest to be '#fff'",
  );
});
