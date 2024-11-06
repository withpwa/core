import compose from "../src";
import { logo_svg } from "./util";

test("should support svg images", async () => {
  expect.assertions(1);
  const result = await compose(logo_svg);

  await expect(result).toMatchComposeSnapshot();
});
