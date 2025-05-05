import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: 不正なblock_type", () => {
  it("未知のblock_typeを含む場合もUnsupportedBlockとしてレンダリングされる", () => {
    const block = {
      block_id: "invalid-block",
      block_type: 9999,
      parent_id: "",
      children: [],
      text: "不正なブロック",
    };
    const blocks = [block];
    const { container } = render(<LarkRenderer initialData={{ blocks }} />);
    expect(container).toMatchSnapshot();
  });
});
