import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer パフォーマンス: 1000個のtextブロック", () => {
  it("大量のblocksでもレンダリングできる", async () => {
    const blocks = Array.from({ length: 1000 }).map((_, i) => ({
      block_id: `text-${i}`,
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: `テキスト${i}`,
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    }));
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
