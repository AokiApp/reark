import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 入れ子構造: 10段ネストのbulletリスト", () => {
  it("10段ネストのbulletリストをレンダリングできる", async () => {
    const blocks = [];
    let parentId = "";
    for (let i = 0; i < 10; i++) {
      const block = {
        block_id: `bullet-nest-${i}`,
        block_type: 12,
        parent_id: parentId,
        bullet: {
          elements: [
            {
              text_run: {
                content: `ネスト${i}`,
                text_element_style: { bold: false },
              },
            },
          ],
          style: { align: "left", folded: false },
        },
        children: i < 9 ? [`bullet-nest-${i + 1}`] : [],
      };
      blocks.push(block);
      parentId = `bullet-nest-${i}`;
    }
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
