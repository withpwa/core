import compose from "../src";
import { logo_png } from "./util";

test("should add crossOrigin to manifest tag when loadManifestWithCredentials is true", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    loadManifestWithCredentials: true,
    icons: {
      pwaIcon: true,
      appleIcon: false,
      appleStartup: false,
      favicons: false,
      windowsTile: false,
      yandex: false,
    },
  });

  await expect(result).toMatchComposeSnapshot();
});
