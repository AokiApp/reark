import { render } from "@testing-library/react";
import { LarkRenderer } from "../LarkRenderer";

describe("LarkRenderer", () => {
  it("正常系スナップショットテスト", () => {
    const exampleBlock = {
      block_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
      block_type: 1,
      children: ["K2jmdGqW1o0t8fx3CDNjV6vKpsf"],
    };
    const childBlock = {
      block_id: "K2jmdGqW1o0t8fx3CDNjV6vKpsf",
      block_type: 2,
      children: [],
      text: "テスト用子ブロック",
    };
    const { container } = render(
      <LarkRenderer initialData={{ blocks: [exampleBlock, childBlock] }} />,
    );
    expect(container).toMatchSnapshot();
  });
});

it("複合ケース: page配下に複数ブロックを含む統合レンダリング", () => {
  // テスト用の複合データを直接定義
  const pageBlock = {
    block_id: "page-1",
    block_type: 1,
    children: ["text-1", "heading-1", "bullet-1", "table-1"],
    parent_id: "",
  };
  const textBlock = {
    block_id: "text-1",
    block_type: 2,
    parent_id: "page-1",
    text: [
      {
        text_run: {
          content: "統合テスト用テキスト",
          text_element_style: { bold: false },
        },
      },
    ],
    children: [],
  };
  const headingBlock = {
    block_id: "heading-1",
    block_type: 3,
    parent_id: "page-1",
    heading1: {
      elements: [
        { text_run: { content: "見出し", text_element_style: { bold: true } } },
      ],
      style: { align: 1, folded: false },
    },
    children: [],
  };
  const bulletBlock = {
    block_id: "bullet-1",
    block_type: 12,
    parent_id: "page-1",
    bullet: {
      elements: [
        {
          text_run: {
            content: "リスト項目",
            text_element_style: { bold: false },
          },
        },
      ],
      style: { align: 1, folded: false },
    },
    children: [],
  };
  const tableBlock = {
    block_id: "table-1",
    block_type: 18,
    parent_id: "page-1",
    table: {
      cells: [
        [{ text: "セル1" }, { text: "セル2" }],
        [{ text: "セル3" }, { text: "セル4" }],
      ],
      property: {},
    },
    children: [],
  };

  const blocks = [pageBlock, textBlock, headingBlock, bulletBlock, tableBlock];

  const { container } = render(<LarkRenderer initialData={{ blocks }} />);
  expect(container).toMatchSnapshot();
});

it("属性バリエーション: 太字・斜体・下線・打消し・インラインコード・コメント複合", () => {
  const pageBlock = {
    block_id: "page-attr",
    block_type: 1,
    children: ["text-attr"],
    parent_id: "",
  };
  const textBlock = {
    block_id: "text-attr",
    block_type: 2,
    parent_id: "page-attr",
    text: [
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
    children: [],
  };

  const blocks = [pageBlock, textBlock];

  const { container } = render(<LarkRenderer initialData={{ blocks }} />);
  expect(container).toMatchSnapshot();
});

it("入れ子構造: bulletリストの多段ネストを含む統合レンダリング", () => {
  // 多段ネストのbulletリストデータを直接定義
  const pageBlock = {
    block_id: "page-nest",
    block_type: 1,
    children: ["bullet-parent"],
    parent_id: "",
  };
  const bulletParent = {
    block_id: "bullet-parent",
    block_type: 12,
    parent_id: "page-nest",
    bullet: {
      elements: [
        {
          text_run: {
            content: "親リスト",
            text_element_style: { bold: false },
          },
        },
      ],
      style: { align: 1, folded: false },
    },
    children: ["bullet-child"],
  };
  const bulletChild = {
    block_id: "bullet-child",
    block_type: 12,
    parent_id: "bullet-parent",
    bullet: {
      elements: [
        {
          text_run: {
            content: "子リスト",
            text_element_style: { bold: false },
          },
        },
      ],
      style: { align: 1, folded: false },
    },
    children: ["bullet-grandchild"],
  };
  const bulletGrandchild = {
    block_id: "bullet-grandchild",
    block_type: 12,
    parent_id: "bullet-child",
    bullet: {
      elements: [
        {
          text_run: {
            content: "孫リスト",
            text_element_style: { bold: false },
          },
        },
      ],
      style: { align: 1, folded: false },
    },
    children: [],
  };

  const blocks = [pageBlock, bulletParent, bulletChild, bulletGrandchild];

  const { container } = render(<LarkRenderer initialData={{ blocks }} />);
  expect(container).toMatchSnapshot();
});

it("異常系: 不正なblock_typeを含む場合のレンダリング", () => {
  const pageBlock = {
    block_id: "page-invalid",
    block_type: 1,
    children: ["invalid-block"],
    parent_id: "",
  };
  const invalidBlock = {
    block_id: "invalid-block",
    block_type: 9999, // 存在しないblock_type
    parent_id: "page-invalid",
    children: [],
  };
  const blocks = [pageBlock, invalidBlock];
  const { container } = render(<LarkRenderer initialData={{ blocks }} />);
  expect(container).toMatchSnapshot();
});

it("異常系: 必須プロパティ欠損（textなしtext block）", () => {
  const pageBlock = {
    block_id: "page-missing",
    block_type: 1,
    children: ["text-missing"],
    parent_id: "",
  };
  const textBlock = {
    block_id: "text-missing",
    block_type: 2,
    parent_id: "page-missing",
    // text プロパティが無い
    children: [],
  };
  const blocks = [pageBlock, textBlock];
  const { container } = render(<LarkRenderer initialData={{ blocks }} />);
  expect(container).toMatchSnapshot();
});

it("異常系: blocksが空配列", () => {
  const blocks: any[] = [];
  const { container } = render(<LarkRenderer initialData={{ blocks }} />);
  expect(container).toMatchSnapshot();
});

it("異常系: root blockが存在しない", () => {
  const blocks = [
    {
      block_id: "not-root",
      block_type: 2,
      parent_id: "none",
      text: {
        elements: [
          {
            text_run: {
              content: "ルートブロックなし",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    },
  ];
  const { container } = render(<LarkRenderer initialData={{ blocks }} />);
  expect(container).toMatchSnapshot();
});
