import compose from "../src";
import { logo_png, logo_svg } from "./util";

test("should reuse svg as a favicon", async () => {
  expect.assertions(1);

  const result = await compose(logo_svg, {
    icons: {
      favicons: ["favicon.svg"],
      pwaIcon: false,
      appleIcon: false,
      appleStartup: false,
      windowsTile: false,
      yandex: false,
    },
  });

  await expect(result).toMatchComposeSnapshot();
});

test("should generate svg favicon", async () => {
  expect.assertions(2);

  const result = await compose(logo_png, {
    icons: {
      favicons: ["favicon.svg"],
      pwaIcon: false,
      appleIcon: false,
      appleStartup: false,
      windowsTile: false,
      yandex: false,
    },
  });

  const svg = result.images[0].contents;
  const deterministicSvg = Buffer.from(
    svg.toString().replace(/png;base64,[^"]+/, ""),
  );
  await expect({
    ...result,
    images: [
      {
        ...result.images[0],
        contents: deterministicSvg,
      },
    ],
  }).toMatchComposeSnapshot();

  const roundtripResult = await compose(svg, {
    icons: {
      pwaIcon: false,
      appleIcon: false,
      appleStartup: false,
      windowsTile: false,
      yandex: false,
    },
  });
  await expect(roundtripResult).toMatchComposeSnapshot();
});
