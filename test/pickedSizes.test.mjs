import compose from "../src";
import { logo_png } from "./util";

test("should generate compose of a given size", async () => {
  expect.assertions(1);
  const result = await compose(logo_png, {
    icons: {
      favicons: [
        {
          name: "favicon.ico",
          sizes: [
            { width: 48, height: 48 },
            { width: 64, height: 64 },
          ],
        },
        "favicon-48x48.png",
      ],
      pwaIcon: false,
      appleIcon: false,
      appleStartup: false,
      windowsTile: false,
      yandex: false,
    },
  });
  await expect(result).toMatchComposeSnapshot();
});
