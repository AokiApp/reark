import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: childrenプロパティ欠損", () => {
  it("childrenプロパティが存在しないブロックもレンダリングできる", () => {
    const block = {
      block_id: "no-children",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "children欠損",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      // childrenプロパティ無し
    };
    const blocks = [block];
    const { container } = render(<LarkRenderer initialData={{ blocks }} />);
    expect(container).toMatchSnapshot();
  });
});
