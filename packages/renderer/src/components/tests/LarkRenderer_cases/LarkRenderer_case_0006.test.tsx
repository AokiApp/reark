import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: textプロパティ欠損", () => {
  it("textプロパティが存在しないブロックもレンダリングできる", async () => {
    const block = {
      block_id: "no-text",
      block_type: 2,
      parent_id: "",
      children: [],
      // textプロパティ無し
    };
    const blocks = [block];
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
