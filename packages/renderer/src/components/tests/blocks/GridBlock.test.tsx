import { render, screen } from "@testing-library/react";
import { GridBlock } from "../../blocks/GridBlock";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのGridBlock

describe("GridBlock block", () => {
  it("renders grid block and unsupported columns", () => {
    const gridBlock = {
      block_id: "dummy-grid",
      block_type: 15,
      grid: {
        column_size: 2,
      },
      children: ["dummy-col-1", "dummy-col-2"],
    };

    const gridColumnBlock1 = {
      block_id: "dummy-col-1",
      block_type: 16,
      grid_column: {
        width_ratio: 1,
      },
    };

    const gridColumnBlock2 = {
      block_id: "dummy-col-2",
      block_type: 16,
      grid_column: {
        width_ratio: 1,
      },
    };

    const { container } = render(
      <BlockStoreProvider
        items={[gridBlock, gridColumnBlock1, gridColumnBlock2]}
      >
        <GridBlock block={gridBlock} />
      </BlockStoreProvider>,
    );
    // .reark-grid要素が存在すること
    const grid = container.querySelector(".reark-grid");
    expect(grid).not.toBeNull();
    // Unsupported block type: 16 の表示が2つあること
    const unsupported = screen.getAllByText(/Unsupported block type: 16/);
    expect(unsupported.length).toBe(2);
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
