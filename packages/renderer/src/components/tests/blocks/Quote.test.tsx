import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { Quote } from "../../blocks/Quote";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

describe("Quote", () => {
  it("renders quote text in blockquote with correct class", async () => {
    const quoteBlock = {
      block_id: "quote-block-1",
      block_type: 15,
      parent_id: "parent-block",
      quote: {
        elements: [
          {
            text_run: {
              content: "これは引用です。",
              text_element_style: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                inline_code: false,
              },
            },
          },
        ],
        style: {
          align: 1 as const,
          folded: false,
        },
      },
    };
    const { container, vrt } = renderWithVRT(
      <BlockStoreProvider items={[quoteBlock]}>
        <Quote block={quoteBlock} />
      </BlockStoreProvider>,
    );
    // blockquote要素とクラス名
    const blockquote = container.querySelector("blockquote.reark-quote-block");
    expect(blockquote).not.toBeNull();
    // テキスト内容
    expect(screen.getByText(/これは引用です。/)).toBeInTheDocument();
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
