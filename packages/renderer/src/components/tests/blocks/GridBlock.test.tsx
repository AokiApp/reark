import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { GridBlock } from "../../blocks/GridBlock";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのGridBlock

describe("GridBlock block", () => {
  it("renders grid block and unsupported columns", async () => {
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

    const { container, vrt } = renderWithVRT(
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
    // VRT
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders grid block with no columns", async () => {
  const gridBlock = {
    block_id: "empty-grid",
    block_type: 15,
    grid: {
      column_size: 0,
    },
    children: [],
  };
  const { container, vrt } = renderWithVRT(
    <BlockStoreProvider items={[gridBlock]}>
      <GridBlock block={gridBlock} />
    </BlockStoreProvider>,
  );
  // .reark-grid要素が存在し、子要素がないこと
  const grid = container.querySelector(".reark-grid");
  expect(grid).not.toBeNull();
  expect(grid?.children.length).toBe(0);
  // VRT
  await vrt();
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
