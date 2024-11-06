import compose from "../src";
import { readFile } from "fs/promises";
import { logo_png, logo_svg, pixel_art } from "./util";

test("should accept an array of either buffers or paths to source images", async () => {
  expect.assertions(1);

  const result = await compose([logo_png, await readFile(logo_svg)]);

  await expect(result).toMatchComposeSnapshot();
});

test("should select best source image by its size", async () => {
  expect.assertions(1);

  const result = await compose([logo_png, pixel_art]);

  await expect(result).toMatchComposeSnapshot();
});
