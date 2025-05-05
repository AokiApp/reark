import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { Page } from "../../blocks/Page";

// .private.local/example-blocks.json よりPageブロックの例

describe("Page block", () => {
  it("renders page text", async () => {
    const pageBlock = {
      block_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
      block_type: 1,
      page: {
        elements: [
          {
            text_run: {
              content: "Lark",
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
              content: "レン",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745344221708322"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "ダ",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745247643664418", "7500745344221708322"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "ラ",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745247643664418"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "ー",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745247643664418", "7500745292006817825"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "テ",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745247643664418"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
          {
            text_run: {
              content: "ストケース",
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
        },
      },
    };
    const { container, vrt } = renderWithVRT(<Page block={pageBlock} />);
    expect(screen.getByText(/Lark/)).toBeInTheDocument();
    expect(screen.getByText(/レン/)).toBeInTheDocument();
    expect(screen.getByText(/ダ/)).toBeInTheDocument();
    expect(screen.getByText(/ラ/)).toBeInTheDocument();
    expect(screen.getAllByText(/ー/).length).toBeGreaterThan(0);
    expect(screen.getByText(/テ/)).toBeInTheDocument();
    expect(screen.getByText(/ストケース/)).toBeInTheDocument();
    // VRT
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders nothing when page elements is empty", async () => {
  const pageBlock = {
    block_id: "empty-page",
    block_type: 1,
    page: {
      elements: [],
      style: {
        align: 1 as const,
      },
    },
  };
  const { container, vrt } = renderWithVRT(<Page block={pageBlock} />);
  // 空のdiv（reark-page）が描画されることを期待
  const div = container.querySelector(".reark-page");
  expect(div).not.toBeNull();
  expect(div?.textContent).toBe("");
  // VRT
  await vrt();
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
