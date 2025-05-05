import { render, screen } from "@testing-library/react";
import { CodeBlock } from "../../blocks/CodeBlock";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// .private.local/example-blocks.json よりCodeBlockブロックの例

describe("CodeBlock block", () => {
  it("renders code block with code and language", () => {
    const codeBlock = {
      block_id: "HZTvdsqcoo1UpZxfKNEjA562pgg",
      block_type: 14,
      code: {
        elements: [
          {
            text_run: {
              content: "def add(a,b):",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745501210312738"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "\n",
              text_element_style: {
                bold: false,
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "    return a+b",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745501210312738"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
        ],
        style: {
          language: 49,
          wrap: true,
        },
      },
    };
    const { container } = render(
      <BlockStoreProvider items={[codeBlock]}>
        <CodeBlock block={codeBlock} />
      </BlockStoreProvider>,
    );
    // コード内容
    expect(screen.getByText(/def add\(a,b\):/)).toBeInTheDocument();
    expect(screen.getByText(/return a\+b/)).toBeInTheDocument();
    // 言語名
    expect(screen.getByText(/Python/)).toBeInTheDocument();
    // Copyボタン
    expect(screen.getByRole("button", { name: /Copy/ })).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
