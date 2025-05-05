import { render, screen } from "@testing-library/react";
import { Text } from "../../blocks/Text";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// .private.local/example-blocks.json よりTextブロックの例

describe("Text block", () => {
  it("renders text from context", () => {
    const textBlock = {
      block_id: "T8F8dOwtNom7yHxww2ZjPnw3pSf",
      block_type: 2,
      comment_ids: ["7500745405299163169"],
      parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
      text: {
        elements: [
          {
            text_run: {
              content: "本文書は、 ",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745405299163169"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "lark2react",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745405299163169"],
                inline_code: true,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "の描画を確かめるためのものである。",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745405299163169"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
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
    const { container } = render(
      <BlockStoreProvider items={[textBlock]}>
        <Text elements={textBlock.text.elements} style={textBlock.text.style} />
      </BlockStoreProvider>,
    );
    // 主要なテキストが表示されていることを確認（部分一致・正規表現でマッチ）
    expect(screen.getByText(/本文書は/)).toBeInTheDocument();
    expect(screen.getByText(/lark2react/)).toBeInTheDocument();
    expect(
      screen.getByText(/の描画を確かめるためのものである/),
    ).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
