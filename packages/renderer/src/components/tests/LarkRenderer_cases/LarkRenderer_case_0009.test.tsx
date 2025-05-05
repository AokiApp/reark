import { render } from "@testing-library/react";
import { LarkRenderer } from "../../LarkRenderer";

describe("LarkRenderer 複合ケース: 複数ブロック混在", () => {
  it("text, heading, bullet, table など複数ブロックを同時にレンダリングできる", () => {
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

    const { container } = render(<LarkRenderer initialData={{ blocks }} />);
    expect(container).toMatchSnapshot();
  });
});
