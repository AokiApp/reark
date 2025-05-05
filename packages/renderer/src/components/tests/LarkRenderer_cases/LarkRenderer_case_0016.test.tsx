import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 属性バリエーション: コメント付きのみ", () => {
  it("textブロック: コメント付きのみ", async () => {
    const block = {
      block_id: "comment-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "コメント付きのみ",
              text_element_style: { comment_ids: ["c3"] },
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
