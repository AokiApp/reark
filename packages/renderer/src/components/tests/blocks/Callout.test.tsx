import { render, screen } from "@testing-library/react";
import { Callout } from "../../blocks/Callout";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// .private.local/example-blocks.json よりCalloutブロックの例
describe("Callout block", () => {
  it("renders callout with emoji and children", () => {
    const calloutBlock = {
      block_id: "PrkUdrRERoRwQfxoLZhjS6qfpFf",
      block_type: 19,
      callout: {
        background_color: 4,
        border_color: 4,
        emoji_id: "innocent",
        text_color: 0,
      },
      children: ["DRwodrwDoopaGuxAiTUjx2shp3f", "G4OOdwJdnoaarOxBhYsjm19LpHb"],
      comment_ids: ["7500745586526650402"],
      parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
    };

    const heading3Block = {
      block_id: "DRwodrwDoopaGuxAiTUjx2shp3f",
      block_type: 5,
      comment_ids: ["7500751511807328290", "7500745624808063009"],
      heading3: {
        elements: [
          {
            text_run: {
              content: "コー",
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
              content: "ル",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745624808063009"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "ア",
              text_element_style: {
                bold: false,
                comment_ids: ["7500751511807328290"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "ウト",
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

    const bulletBlock = {
      block_id: "G4OOdwJdnoaarOxBhYsjm19LpHb",
      block_type: 12,
      bullet: {
        elements: [
          {
            text_run: {
              content: "ネスト",
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
      <BlockStoreProvider items={[calloutBlock, heading3Block, bulletBlock]}>
        <Callout block={calloutBlock} />
      </BlockStoreProvider>,
    );
    // Callout emoji
    expect(screen.getByText("😇")).toBeInTheDocument();
    // heading3: "コー", "ル", "ア", "ウト"（まとめて"コールアウト"で部分一致）
    expect(screen.getByText(/コー/)).toBeInTheDocument();
    expect(screen.getByText(/ル/)).toBeInTheDocument();
    expect(screen.getByText(/ア/)).toBeInTheDocument();
    expect(screen.getByText(/ウト/)).toBeInTheDocument();
    // bullet: "ネスト"
    expect(screen.getByText(/ネスト/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders callout with no children", () => {
  const calloutBlock = {
    block_id: "empty-callout",
    block_type: 19,
    callout: {
      background_color: 4,
      border_color: 4,
      emoji_id: "innocent",
      text_color: 0,
    },
    children: [],
    comment_ids: [],
    parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
  };
  const { container } = render(
    <BlockStoreProvider items={[calloutBlock]}>
      <Callout block={calloutBlock} />
    </BlockStoreProvider>,
  );
  // Callout emojiのみが描画されること
  expect(screen.getByText("😇")).toBeInTheDocument();
  // 子要素が描画されないこと
  expect(container.textContent).toBe("😇");
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
