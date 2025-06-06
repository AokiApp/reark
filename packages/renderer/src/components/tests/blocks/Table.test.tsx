import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { Table } from "../../blocks/Table";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのTableブロック（最小限）

describe("Table block", () => {
  it("renders table and unsupported cells", async () => {
    const tableBlock = {
      block_id: "dummy-table",
      block_type: 21,
      table: {
        cells: ["cell-1", "cell-2", "cell-3", "cell-4"],
        property: {
          column_size: 2,
          row_size: 2,
          header_row: true,
          header_column: false,
          column_width: [100, 100],
          merge_info: [
            { col_span: 1, row_span: 1 },
            { col_span: 1, row_span: 1 },
            { col_span: 1, row_span: 1 },
            { col_span: 1, row_span: 1 },
          ],
        },
      },
    };

    const cellBlock1 = { block_id: "cell-1", block_type: 97 };
    const cellBlock2 = { block_id: "cell-2", block_type: 97 };
    const cellBlock3 = { block_id: "cell-3", block_type: 97 };
    const cellBlock4 = { block_id: "cell-4", block_type: 97 };

    const { container, vrt } = renderWithVRT(
      <BlockStoreProvider
        items={[tableBlock, cellBlock1, cellBlock2, cellBlock3, cellBlock4]}
      >
        <Table block={tableBlock} />
      </BlockStoreProvider>,
    );
    // .reark-table-wrapper要素が存在すること
    const wrapper = container.querySelector(".reark-table-wrapper");
    expect(wrapper).not.toBeNull();
    // Unsupported block type: 97 の表示が4つあること
    const unsupported = screen.getAllByText(/Unsupported block type: 97/);
    expect(unsupported.length).toBe(4);
    // VRT
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders table with no cells", async () => {
  const tableBlock = {
    block_id: "empty-table",
    block_type: 21,
    table: {
      cells: [],
      property: {
        column_size: 2,
        row_size: 2,
        header_row: true,
        header_column: false,
        column_width: [100, 100],
        merge_info: [],
      },
    },
  };
  const { container, vrt } = renderWithVRT(
    <BlockStoreProvider items={[tableBlock]}>
      <Table block={tableBlock} />
    </BlockStoreProvider>,
  );
  // .reark-table-wrapper要素が存在し、テーブル本体が空であること
  const wrapper = container.querySelector(".reark-table-wrapper");
  expect(wrapper).not.toBeNull();
  const table = wrapper?.querySelector("table");
  expect(table).not.toBeNull();
  expect(table?.textContent).toBe("");
  // VRT
  await vrt();
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
