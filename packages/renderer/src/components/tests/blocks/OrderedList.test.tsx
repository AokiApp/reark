import { render, screen } from "@testing-library/react";
import { OrderedList } from "../../blocks/OrderedList";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// .private.local/example-blocks.json よりOrderedListブロックの例

describe("OrderedList block", () => {
  it("renders ordered list text", () => {
    const orderedListBlock = {
      block_id: "XMqHd3327oPoBkxds8pjeRLPpyf",
      block_type: 13,
      ordered: {
        elements: [
          {
            text_run: {
              content: "Ordered",
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
          sequence: "1",
        },
      },
      parent_id: "XB9wdv7ZNoantyxyHG6jEv37p1c",
    };
    const { container } = render(
      <BlockStoreProvider items={[orderedListBlock]}>
        <OrderedList block={orderedListBlock} />
      </BlockStoreProvider>,
    );
    expect(screen.getByText(/Ordered/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders nothing when ordered list elements is empty", () => {
  const orderedListBlock = {
    block_id: "empty-ordered-list",
    block_type: 13,
    ordered: {
      elements: [],
      style: {
        align: 1 as const,
        folded: false,
        sequence: "1",
      },
    },
    parent_id: "XB9wdv7ZNoantyxyHG6jEv37p1c",
  };
  const { container } = render(
    <BlockStoreProvider items={[orderedListBlock]}>
      <OrderedList block={orderedListBlock} />
    </BlockStoreProvider>,
  );
  // 空のol要素が描画されることを期待
  // reark-ordered-listが存在し、その中のreark-text-blockが空であることを期待
  const olDiv = container.querySelector(".reark-ordered-list");
  expect(olDiv).not.toBeNull();
  const textBlock = olDiv?.querySelector(".reark-text-block");
  expect(textBlock).not.toBeNull();
  expect(textBlock?.textContent).toBe("");
});
