import compose from "../src";
import { logo_png } from "./util";

test("should allow disabling asset generation", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    icons: {
      pwaIcon: false,
      appleIcon: false,
      appleStartup: false,
      favicons: false,
      windowsTile: false,
      yandex: false,
    },
  });

  expect(result).toStrictEqual({
    files: [],
    images: [],
    html: [],
  });
});
