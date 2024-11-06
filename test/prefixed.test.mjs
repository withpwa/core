import compose from "../src";
import { logo_png } from "./util";

test("should allow setting an URL prefix", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    output: {
      assetsPrefix: "https://domain/subdomain",
    },
  });

  await expect(result).toMatchComposeSnapshot();
});
