import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション: コメント＋斜体", () => {
  it("textブロック: コメント＋斜体", () => {
    const block = {
      block_id: "comment-italic",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "コメント＋斜体",
              text_element_style: { comment_ids: ["c4"], italic: true },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    };
    const blocks = [block];
    const { container } = render(<LarkRenderer initialData={{ blocks }} />);
    expect(container).toMatchSnapshot();
  });
});
