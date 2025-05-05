import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション複合", () => {
  it("textブロック: 太字・斜体・下線・打消し・インラインコード・コメント付き", async () => {
    const textBlock = {
      block_id: "text-attr-1",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "太字",
              text_element_style: { bold: true },
            },
          },
          {
            text_run: {
              content: "斜体",
              text_element_style: { italic: true },
            },
          },
          {
            text_run: {
              content: "下線",
              text_element_style: { underline: true },
            },
          },
          {
            text_run: {
              content: "打消し",
              text_element_style: { strikethrough: true },
            },
          },
          {
            text_run: {
              content: "インラインコード",
              text_element_style: { inline_code: true },
            },
          },
          {
            text_run: {
              content: "コメント付き",
              text_element_style: { comment_ids: ["c1"] },
            },
          },
        ],
        style: { align: 1, folded: false },
      },
      children: [],
    };

    const blocks = [textBlock];

    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
