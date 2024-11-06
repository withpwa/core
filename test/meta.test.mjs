import compose from "../src";
import { logo_png } from "./util";

test("should allow specifying metadata", async () => {
  expect.assertions(1);

  const result = await compose(logo_png, {
    name: "PWAs Core",
    themes: ["#abc"],
    appleStatusBarStyle: "default",
    background: "#333",
    manifest: {
      short_name: "PWAs",
      description: "Progressive Web App",
      dir: "rtl",
      lang: "zh-CN",
      display: "fullscreen",
      display_override: ["window-controls-overlay"],
      orientation: "portrait",
      scope: "/",
      start_url: "/subdomain/",
    },
    developerName: "Sombody",
    developerURL: "https://somebody.com",
    version: "3.2.1",
  });

  await expect(result).toMatchComposeSnapshot();
});
