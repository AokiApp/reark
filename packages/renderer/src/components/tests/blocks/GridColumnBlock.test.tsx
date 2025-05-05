import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { GridColumnBlock } from "../../blocks/GridColumnBlock";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのGridColumnBlock

describe("GridColumnBlock block", () => {
  it("renders grid column block and unsupported child", async () => {
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

    const { container, vrt } = renderWithVRT(
      <BlockStoreProvider items={[gridColumnBlock, dummyChildBlock]}>
        <GridColumnBlock block={gridColumnBlock} />
      </BlockStoreProvider>,
    );
    // .reark-grid-column要素が存在すること
    const col = container.querySelector(".reark-grid-column");
    expect(col).not.toBeNull();
    // Unsupported block type: 99 の表示があること
    expect(screen.getByText(/Unsupported block type: 99/)).toBeInTheDocument();
    // VRT
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders grid column block with no children", async () => {
  const gridColumnBlock = {
    block_id: "empty-col",
    block_type: 16,
    grid_column: {
      width_ratio: 1,
    },
    children: [],
  };
  const { container, vrt } = renderWithVRT(
    <BlockStoreProvider items={[gridColumnBlock]}>
      <GridColumnBlock block={gridColumnBlock} />
    </BlockStoreProvider>,
  );
  // .reark-grid-column要素が存在し、子要素がないこと
  const col = container.querySelector(".reark-grid-column");
  expect(col).not.toBeNull();
  expect(col?.children.length).toBe(0);
  // VRT
  await vrt();
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
