import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: textプロパティ欠損", () => {
  it("textプロパティが存在しないブロックもレンダリングできる", () => {
    const block = {
      block_id: "no-text",
      block_type: 2,
      parent_id: "",
      children: [],
      // textプロパティ無し
    };
    const blocks = [block];
    const { container } = render(<LarkRenderer initialData={{ blocks }} />);
    expect(container).toMatchSnapshot();
  });
});
