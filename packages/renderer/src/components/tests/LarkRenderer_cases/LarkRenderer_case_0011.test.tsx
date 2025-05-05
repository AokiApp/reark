import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション: 太字のみ", () => {
  it("textブロック: 太字のみ", async () => {
    const block = {
      block_id: "bold-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "太字のみ",
              text_element_style: { bold: true },
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
