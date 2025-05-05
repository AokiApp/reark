import { render, RenderOptions } from "@testing-library/react";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs/promises";

const doVRT = process.env.DO_VRT === "true";

export function renderWithVRT(
  ui: React.ReactElement,
  options?: RenderOptions,
): ReturnType<typeof render> & { vrt: () => Promise<void> } {
  const result = render(ui, options);
  return {
    ...result,
    async vrt() {
      if (!doVRT) {
        // User prefers not to run VRT
        // if you want to run VRT, set DO_VRT=true as an environment variable
        // or set it in your test command
        // e.g. "DO_VRT=true jest"
        // or "DO_VRT=true npm test"
        return;
      }
      const html = result.container.innerHTML;
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      // 必要に応じてviewportやCSSのセットアップを追加
      await page.setContent(html);

      // VRT用CSS（style.css）を必ず読み込む
      const styleCssPath = path.resolve(
        __dirname,
        "../../../styles/blocks.css",
      );
      const css = await fs.readFile(styleCssPath, "utf-8");
      await page.addStyleTag({ content: css });

      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotsDir: path.join(__dirname, "../__image_snapshots__"),
      });
      await browser.close();
    },
  };
}
