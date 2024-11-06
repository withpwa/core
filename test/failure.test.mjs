import compose from "../src";
import { logo_png } from "./util";

// eslint-disable no-magic-numbers
test("should fail gracefully if no source is provided", async () => {
  expect.assertions(1);
  await expect(compose([])).rejects.toThrow("No source provided");
});

test("should fail gracefully if source is neither a buffer or a string", async () => {
  expect.assertions(2);
  await expect(compose(42)).rejects.toThrow("Invalid source type provided");
  await expect(compose([42])).rejects.toThrow("Invalid source type provided");
});

test("should fail gracefully if buffer is empty", async () => {
  expect.assertions(2);

  await expect(compose(Buffer.from(""))).rejects.toThrow(
    "Invalid image buffer",
  );
  await expect(compose([Buffer.from("")])).rejects.toThrow(
    "Invalid image buffer",
  );
});

test("should fail gracefully if path to source image is invalid", async () => {
  expect.assertions(2);

  await expect(compose("missing.png")).rejects.toThrow(
    /ENOENT: no such file or directory/,
  );
  await expect(compose(["missing.png"])).rejects.toThrow(
    /ENOENT: no such file or directory/,
  );
});

// eslint-disable-next-line jest/no-disabled-tests
test.skip("should fail gracefully if option is not supported on platform", async () => {
  expect.assertions(1);

  await expect(
    compose(logo_png, {
      icons: {
        favicons: { foo: 10 },
      },
    }),
  ).rejects.toThrow("Unsupported option 'foo' on platform 'favicons'");
});
