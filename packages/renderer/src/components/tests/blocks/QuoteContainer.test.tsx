import { render, screen } from "@testing-library/react";
import { QuoteContainer } from "../../blocks/QuoteContainer";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのQuoteContainer

describe("QuoteContainer block", () => {
  it("renders quote container and unsupported child", () => {
    const quoteContainerBlock = {
      block_id: "dummy-quote-container",
      block_type: 99,
      children: ["dummy-child"],
    };

    const dummyChildBlock = {
      block_id: "dummy-child",
      block_type: 98,
    };

    const { container } = render(
      <BlockStoreProvider items={[quoteContainerBlock, dummyChildBlock]}>
        <QuoteContainer block={quoteContainerBlock} />
      </BlockStoreProvider>,
    );
    // .reark-quote-container要素が存在すること
    const quote = container.querySelector(".reark-quote-container");
    expect(quote).not.toBeNull();
    // Unsupported block type: 98 の表示があること
    expect(screen.getByText(/Unsupported block type: 98/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
