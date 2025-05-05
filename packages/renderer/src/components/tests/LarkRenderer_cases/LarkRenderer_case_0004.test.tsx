import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: 不正なblock_type", () => {
  it("未知のblock_typeを含む場合もUnsupportedBlockとしてレンダリングされる", async () => {
    const block = {
      block_id: "invalid-block",
      block_type: 9999,
      parent_id: "",
      children: [],
      text: "不正なブロック",
    };
    const blocks = [block];
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
