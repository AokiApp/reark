import { render, screen } from "@testing-library/react";
import { OrderedList } from "../../blocks/OrderedList";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// .private.local/example-blocks.json よりOrderedListブロックの例
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
            underline: false
          }
        }
      }
    ],
    style: {
      align: 1 as 1,
      folded: false,
      sequence: "1"
    }
  },
  parent_id: "XB9wdv7ZNoantyxyHG6jEv37p1c"
};

describe("OrderedList block", () => {
  it("renders ordered list text", () => {
    const { container } = render(
      <BlockStoreProvider items={[orderedListBlock]}>
        <OrderedList block={orderedListBlock} />
      </BlockStoreProvider>
    );
    expect(screen.getByText(/Ordered/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});