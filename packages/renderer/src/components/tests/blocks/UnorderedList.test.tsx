import { render, screen } from "@testing-library/react";
import { UnorderedList } from "../../blocks/UnorderedList";

// .private.local/example-blocks.json よりUnorderedListブロックの例
const unorderedListBlock = {
  block_id: "dummy-unordered-list",
  block_type: 12,
  bullet: {
    elements: [
      {
        text_run: {
          content: "Unordered",
          text_element_style: {
            bold: false,
            inline_code: false,
            italic: false,
            strikethrough: false,
            underline: false
          }
        }
      }
    ],
    style: {
      align: 1 as 1,
      folded: false
    }
  }
};

describe("UnorderedList block", () => {
  it("renders unordered list text", () => {
    const { container } = render(<UnorderedList block={unorderedListBlock} />);
    expect(screen.getByText(/Unordered/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});