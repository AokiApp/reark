import { render, screen } from "@testing-library/react";
import { TableCell } from "../../blocks/TableCell";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのTableCell

describe("TableCell block", () => {
  it("renders table cell and unsupported child", () => {
    const tableCellBlock = {
      block_id: "dummy-table-cell",
      block_type: 22,
      children: ["dummy-child"],
    };

    const dummyChildBlock = {
      block_id: "dummy-child",
      block_type: 96,
    };

    const { container } = render(
      <BlockStoreProvider items={[tableCellBlock, dummyChildBlock]}>
        <TableCell block={tableCellBlock} />
      </BlockStoreProvider>,
    );
    // Unsupported block type: 96 の表示があること
    expect(screen.getByText(/Unsupported block type: 96/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
