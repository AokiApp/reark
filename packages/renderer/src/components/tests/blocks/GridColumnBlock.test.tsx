import { render, screen } from "@testing-library/react";
import { GridColumnBlock } from "../../blocks/GridColumnBlock";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのGridColumnBlock

describe("GridColumnBlock block", () => {
  it("renders grid column block and unsupported child", () => {
    const gridColumnBlock = {
      block_id: "dummy-col",
      block_type: 16,
      grid_column: {
        width_ratio: 1,
      },
      children: ["dummy-child"],
    };

    const dummyChildBlock = {
      block_id: "dummy-child",
      block_type: 99,
    };

    const { container } = render(
      <BlockStoreProvider items={[gridColumnBlock, dummyChildBlock]}>
        <GridColumnBlock block={gridColumnBlock} />
      </BlockStoreProvider>,
    );
    // .reark-grid-column要素が存在すること
    const col = container.querySelector(".reark-grid-column");
    expect(col).not.toBeNull();
    // Unsupported block type: 99 の表示があること
    expect(screen.getByText(/Unsupported block type: 99/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
