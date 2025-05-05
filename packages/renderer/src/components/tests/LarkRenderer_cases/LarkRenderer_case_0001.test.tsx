import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: 空データ", () => {
  it("blocksが空配列の場合はnullを返す", () => {
    const { container } = render(<LarkRenderer initialData={{ blocks: [] }} />);
    expect(container.firstChild).toBeNull();
  });

  it("blocksがundefinedの場合はnullを返す", () => {
    const { container } = render(
      <LarkRenderer initialData={{ blocks: undefined as any }} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
