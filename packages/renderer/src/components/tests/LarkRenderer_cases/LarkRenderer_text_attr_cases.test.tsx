import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

// LarkRenderer 属性バリエーション複合
describe("LarkRenderer 属性バリエーション複合", () => {
  it("textブロック: 太字・斜体・下線・打消し・インラインコード・コメント付き", async () => {
    const textBlock = {
      block_id: "text-attr-1",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          { text_run: { content: "太字", text_element_style: { bold: true } } },
          {
            text_run: { content: "斜体", text_element_style: { italic: true } },
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
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: 組み合わせ違い
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
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: 太字のみ
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
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: 斜体のみ
describe("LarkRenderer 属性バリエーション: 斜体のみ", () => {
  it("textブロック: 斜体のみ", async () => {
    const block = {
      block_id: "italic-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "斜体のみ",
              text_element_style: { italic: true },
            },
          },
        ],
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: 下線のみ
describe("LarkRenderer 属性バリエーション: 下線のみ", () => {
  it("textブロック: 下線のみ", async () => {
    const block = {
      block_id: "underline-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "下線のみ",
              text_element_style: { underline: true },
            },
          },
        ],
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: 打消しのみ
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
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: インラインコードのみ
describe("LarkRenderer 属性バリエーション: インラインコードのみ", () => {
  it("textブロック: インラインコードのみ", async () => {
    const block = {
      block_id: "inlinecode-only",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "インラインコードのみ",
              text_element_style: { inline_code: true },
            },
          },
        ],
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: コメント付きのみ
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
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: 太字＋斜体
describe("LarkRenderer 属性バリエーション: 太字＋斜体", () => {
  it("textブロック: 太字＋斜体", async () => {
    const block = {
      block_id: "bold-italic",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "太字＋斜体",
              text_element_style: { bold: true, italic: true },
            },
          },
        ],
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: 下線＋打消し
describe("LarkRenderer 属性バリエーション: 下線＋打消し", () => {
  it("textブロック: 下線＋打消し", async () => {
    const block = {
      block_id: "underline-strike",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "下線＋打消し",
              text_element_style: { underline: true, strikethrough: true },
            },
          },
        ],
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: インラインコード＋太字
describe("LarkRenderer 属性バリエーション: インラインコード＋太字", () => {
  it("textブロック: インラインコード＋太字", async () => {
    const block = {
      block_id: "inlinecode-bold",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "インラインコード＋太字",
              text_element_style: { inline_code: true, bold: true },
            },
          },
        ],
        style: { align: 1 as const, folded: false },
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

// LarkRenderer 属性バリエーション: コメント＋斜体
describe("LarkRenderer 属性バリエーション: コメント＋斜体", () => {
  it("textブロック: コメント＋斜体", async () => {
    const block = {
      block_id: "comment-italic",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "コメント＋斜体",
              text_element_style: { comment_ids: ["c4"], italic: true },
            },
          },
        ],
        style: { align: 1 as const, folded: false },
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
