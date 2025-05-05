import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: 空データ", () => {
  it("blocksが空配列の場合はnullを返す", async () => {
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks: [] }} />,
    );
    await vrt();
    expect(container.firstChild).toBeNull();
  });

  it("blocksがundefinedの場合はnullを返す", async () => {
    const { container, vrt } = renderWithVRT(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <LarkRenderer initialData={{ blocks: undefined as any }} />,
    );
    await vrt();
    expect(container.firstChild).toBeNull();
  });
});
