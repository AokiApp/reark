import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション: 下線のみ", () => {
  it("textブロック: 下線のみ", () => {
    const block = {
      block_id: "underline-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "下線のみ",
              text_element_style: { underline: true },
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
