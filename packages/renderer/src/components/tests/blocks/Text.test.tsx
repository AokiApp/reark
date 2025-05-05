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
  it("renders nothing when elements is empty", () => {
    const emptyTextBlock = {
      block_id: "empty-text",
      block_type: 2,
      text: {
        elements: [],
        style: {
          align: 1 as const,
          folded: false,
        },
      },
    };
    const { container } = render(
      <BlockStoreProvider items={[emptyTextBlock]}>
        <Text
          elements={emptyTextBlock.text.elements}
          style={emptyTextBlock.text.style}
        />
      </BlockStoreProvider>,
    );
    // 空のdiv（reark-text-block）が描画されることを期待
    const div = container.querySelector(".reark-text-block");
    expect(div).not.toBeNull();
    expect(div?.textContent).toBe("");
  });
});

it("renders text with bold style", () => {
  const textBlock = {
    block_id: "BErpdwUbpocGvpxKiDQjVrYApJf",
    block_type: 2,
    parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
    text: {
      elements: [
        {
          text_run: {
            content: "太字",
            text_element_style: {
              bold: true,
              inline_code: false,
              italic: false,
              strikethrough: false,
              underline: false,
            },
          },
        },
        {
          text_run: {
            content: "は英語で",
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
            content: "Bold",
            text_element_style: {
              bold: true,
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
  // "太字"と"Bold"が reark-text--bold クラスで描画されていること
  const boldSpans = container.querySelectorAll("span.reark-text--bold");
  expect(boldSpans.length).toBe(2);
  expect(boldSpans[0].textContent).toBe("太字");
  expect(boldSpans[1].textContent).toBe("Bold");
  // "は英語で"が通常テキストで描画されていること
  expect(screen.getByText(/は英語で/)).toBeInTheDocument();
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});

it("renders empty span when elements contain empty string", () => {
  const textBlock = {
    block_id: "OJwbdtjjPoo0fqxLqhLjYz73pBd",
    block_type: 2,
    parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
    text: {
      elements: [
        {
          text_run: {
            content: "",
            text_element_style: {
              bold: false,
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
  // 空文字列のspanが1つ描画されること
  const spans = container.querySelectorAll("span.reark-text");
  expect(spans.length).toBe(1);
  expect(spans[0].textContent).toBe("");
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
