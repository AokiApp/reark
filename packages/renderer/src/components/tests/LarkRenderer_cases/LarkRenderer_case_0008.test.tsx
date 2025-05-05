import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション: 組み合わせ違い", () => {
  it("textブロック: 太字＋下線、斜体＋打消し、インラインコード＋コメント付き", async () => {
    const block = {
      block_id: "attr-combo",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "太字＋下線",
              text_element_style: { bold: true, underline: true },
            },
          },
          {
            text_run: {
              content: "斜体＋打消し",
              text_element_style: { italic: true, strikethrough: true },
            },
          },
          {
            text_run: {
              content: "インラインコード＋コメント付き",
              text_element_style: { inline_code: true, comment_ids: ["c2"] },
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
