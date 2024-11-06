import compose from "../src";
import { logo_small_svg } from "./util";

// Only one iconset is required that contains large enough images to compare the
// difference between the generated files.
const icons = {
  pwaIcon: false,
  appleIcon: true,
  appleStartup: false,
  favicons: false,
  windowsTile: false,
  yandex: false,
};

test("should scale the SVG image properly", async () => {
  expect.assertions(1);
  const result = await compose(logo_small_svg, { icons });

  result.images = result.images.filter(
    (image) => image.name === "apple-touch-icon-1024x1024.png",
  );

  await expect(result).toMatchComposeSnapshot();
});
