import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { QuoteContainer } from "../../blocks/QuoteContainer";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのQuoteContainer

describe("QuoteContainer block", () => {
  it("renders quote container and unsupported child", async () => {
    const quoteContainerBlock = {
      block_id: "dummy-quote-container",
      block_type: 99,
      children: ["dummy-child"],
    };

    const dummyChildBlock = {
      block_id: "dummy-child",
      block_type: 98,
    };

    const { container, vrt } = renderWithVRT(
      <BlockStoreProvider items={[quoteContainerBlock, dummyChildBlock]}>
        <QuoteContainer block={quoteContainerBlock} />
      </BlockStoreProvider>,
    );
    // .reark-quote-container要素が存在すること
    const quote = container.querySelector(".reark-quote-container");
    expect(quote).not.toBeNull();
    // Unsupported block type: 98 の表示があること
    expect(screen.getByText(/Unsupported block type: 98/)).toBeInTheDocument();
    // VRT
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders quote container with no children", async () => {
  const quoteContainerBlock = {
    block_id: "empty-quote-container",
    block_type: 99,
    children: [],
  };
  const { container, vrt } = renderWithVRT(
    <BlockStoreProvider items={[quoteContainerBlock]}>
      <QuoteContainer block={quoteContainerBlock} />
    </BlockStoreProvider>,
  );
  // .reark-quote-container要素が存在し、子要素がないこと
  const quote = container.querySelector(".reark-quote-container");
  expect(quote).not.toBeNull();
  expect(quote?.children.length).toBe(0);
  // VRT
  await vrt();
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
