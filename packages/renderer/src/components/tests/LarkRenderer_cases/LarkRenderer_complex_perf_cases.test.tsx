import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

// LarkRenderer 複合ケース: 複数ブロック混在
describe("LarkRenderer 複合ケース: 複数ブロック混在", () => {
  it("text, heading, bullet, table など複数ブロックを同時にレンダリングできる", async () => {
    const pageBlock = {
      block_id: "page-mix",
      block_type: 1,
      children: ["text-mix", "heading-mix", "bullet-mix", "table-mix"],
      parent_id: "",
    };
    const textBlock = {
      block_id: "text-mix",
      block_type: 2,
      parent_id: "page-mix",
      text: {
        elements: [
          {
            text_run: {
              content: "複合テスト用テキスト",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    };
    const headingBlock = {
      block_id: "heading-mix",
      block_type: 3,
      parent_id: "page-mix",
      heading1: {
        elements: [
          {
            text_run: {
              content: "見出し複合",
              text_element_style: { bold: true },
            },
          },
        ],
        style: { align: 1, folded: false },
      },
      children: [],
    };
    const bulletBlock = {
      block_id: "bullet-mix",
      block_type: 12,
      parent_id: "page-mix",
      bullet: {
        elements: [
          {
            text_run: {
              content: "リスト複合",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: 1, folded: false },
      },
      children: [],
    };
    const tableBlock = {
      block_id: "table-mix",
      block_type: 18,
      parent_id: "page-mix",
      table: {
        cells: [
          [{ text: "セルA" }, { text: "セルB" }],
          [{ text: "セルC" }, { text: "セルD" }],
        ],
        property: {},
      },
      children: [],
    };

    const blocks = [
      pageBlock,
      textBlock,
      headingBlock,
      bulletBlock,
      tableBlock,
    ];

    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});

// LarkRenderer パフォーマンス: 1000個のtextブロック
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

// LarkRenderer 入れ子構造: 10段ネストのbulletリスト
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
