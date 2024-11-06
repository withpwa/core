import compose from "../src";
import { logo_png } from "./util";

test("Should generate a <link> tag for the safari pinned tab icon (safari-pinned-tab.svg)", async () => {
  expect.assertions(2);
  const { html, images } = await compose(logo_png, {
    icons: {
      favicons: false,
      pwaIcon: false,
      appleIcon: ["safari-pinned-tab.svg"],
      appleStartup: false,
      windowsTile: false,
      yandex: false,
    },
  });
  expect(images.length).toBe(1);
  expect(html).toEqual(
    expect.arrayContaining([expect.stringMatching(/safari-pinned-tab\.svg/)]),
  );
});
