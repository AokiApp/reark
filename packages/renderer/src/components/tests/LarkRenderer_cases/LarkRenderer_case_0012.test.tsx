import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション: 斜体のみ", () => {
  it("textブロック: 斜体のみ", async () => {
    const block = {
      block_id: "italic-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "斜体のみ",
              text_element_style: { italic: true },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    };
    const blocks = [block];
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
