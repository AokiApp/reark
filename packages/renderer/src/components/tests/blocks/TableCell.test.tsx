import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { TableCell } from "../../blocks/TableCell";
import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// ダミーのTableCell

describe("TableCell block", () => {
  it("renders table cell and unsupported child", async () => {
    const tableCellBlock = {
      block_id: "dummy-table-cell",
      block_type: 22,
      children: ["dummy-child"],
    };

    const dummyChildBlock = {
      block_id: "dummy-child",
      block_type: 96,
    };

    const { container, vrt } = renderWithVRT(
      <BlockStoreProvider items={[tableCellBlock, dummyChildBlock]}>
        <TableCell block={tableCellBlock} />
      </BlockStoreProvider>,
    );
    // Unsupported block type: 96 の表示があること
    expect(screen.getByText(/Unsupported block type: 96/)).toBeInTheDocument();
    // VRT
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders table cell with no children", async () => {
  const tableCellBlock = {
    block_id: "empty-table-cell",
    block_type: 22,
    children: [],
  };
  const { container, vrt } = renderWithVRT(
    <BlockStoreProvider items={[tableCellBlock]}>
      <TableCell block={tableCellBlock} />
    </BlockStoreProvider>,
  );
  // .reark-table-cell要素が存在し、子要素がないこと
  // 空のdivが描画されることを期待
  await vrt();
  expect(container.firstChild).not.toBeNull();
  expect(container.firstChild?.nodeName).toBe("DIV");
  const div = container.firstChild as HTMLElement;
  expect(div.className).toBe("");
  expect(div.textContent).toBe("");
});
