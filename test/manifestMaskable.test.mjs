import compose from "../src";
import { readFile } from "fs/promises";
import { logo_png, logo_svg } from "./util";

test("should add `maskable` to manifest purpose when manifestMaskable is true", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    manifestMaskable: true,
  });

  await expect(result).toMatchComposeSnapshot();
});

test("manifestMaskable should accept an array of either buffers or paths to source images", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    manifestMaskable: [logo_png, await readFile(logo_svg)],
  });

  await expect(result).toMatchComposeSnapshot();
});
