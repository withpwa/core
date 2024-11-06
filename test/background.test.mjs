import compose from "../src";
import { logo_png } from "./util";

test("should allow configuring background color on selected platforms", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    icons: {
      pwaIcon: { background: true },
      appleIcon: { background: true },
      appleStartup: { background: true },
      windowsTile: { background: true },
      yandex: { background: true },
    },
  });

  await expect(result).toMatchComposeSnapshot();
});
