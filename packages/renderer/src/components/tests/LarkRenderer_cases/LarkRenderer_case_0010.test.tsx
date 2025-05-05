import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 異常系: 親無し子ブロック", () => {
  it("親が存在しないchildrenを持つブロックもレンダリングできる", () => {
    const childBlock = {
      block_id: "orphan-child",
      block_type: 2,
      parent_id: "non-existent-parent",
      text: {
        elements: [
          {
            text_run: {
              content: "親無し子ブロック",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    };
    const blocks = [childBlock];
    const { container } = render(<LarkRenderer initialData={{ blocks }} />);
    expect(container).toMatchSnapshot();
  });
});
