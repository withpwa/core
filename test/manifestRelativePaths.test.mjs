import compose from "../src";
import { logo_png } from "./util";

test("should images without options.path to manifests when manifestRelativePaths is true", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    manifestRelativePaths: true,
    output: {
      assetsPrefix: "compose/",
    },
    icons: {
      pwaIcon: true,
      windowsTile: true,
      yandex: true,
      appleIcon: false,
      appleStartup: false,
      favicons: false,
    },
  });

  await expect(result).toMatchComposeSnapshot();
});
