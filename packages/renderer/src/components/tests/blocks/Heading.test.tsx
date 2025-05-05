import { render, screen } from "@testing-library/react";
import { Heading1 } from "../../blocks/Heading";

// .private.local/example-blocks.json よりHeading1ブロックの例

describe("Heading1 block", () => {
  it("renders heading1 text", () => {
    const heading1Block = {
      block_id: "K2jmdGqW1o0t8fx3CDNjV6vKpsf",
      block_type: 3,
      heading1: {
        elements: [
          {
            text_run: {
              content: "本文書",
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
              content: "について",
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
      parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
    };
    const { container } = render(<Heading1 block={heading1Block} />);
    expect(screen.getByText(/本文書/)).toBeInTheDocument();
    expect(screen.getByText(/について/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
  it("renders nothing when heading1 elements is empty", () => {
    const heading1Block = {
      block_id: "empty-heading1",
      block_type: 3,
      heading1: {
        elements: [],
        style: {
          align: 1 as const,
          folded: false,
        },
      },
      parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
    };
    const { container } = render(<Heading1 block={heading1Block} />);
    // 空のdiv（reark-heading reark-heading--1）が描画されることを期待
    const div = container.querySelector(".reark-heading.reark-heading--1");
    expect(div).not.toBeNull();
    expect(div?.textContent).toBe("");
  });
  it("renders heading1 with bold element", () => {
    const heading1Block = {
      block_id: "K2jmdGqW1o0t8fx3CDNjV6vKpsf",
      block_type: 3,
      heading1: {
        elements: [
          {
            text_run: {
              content: "本文書",
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
              content: "について",
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
      parent_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
    };
    const { container } = render(<Heading1 block={heading1Block} />);
    // "本文書"が通常テキスト、"について"が太字で描画されていること
    expect(screen.getByText(/本文書/)).toBeInTheDocument();
    const boldSpans = container.querySelectorAll("span.reark-text--bold");
    expect(boldSpans.length).toBe(1);
    expect(boldSpans[0].textContent).toBe("について");
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
