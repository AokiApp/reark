import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション: 打消しのみ", () => {
  it("textブロック: 打消しのみ", async () => {
    const block = {
      block_id: "strike-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "打消しのみ",
              text_element_style: { strikethrough: true },
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
