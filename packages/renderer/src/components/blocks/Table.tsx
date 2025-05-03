import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";

/**
 * Table renderer for Lark TableBlock.
 * - Supports header row and column.
 * - Supports cell merging (colSpan, rowSpan) via merge_info.
 * - Renders each cell using BlockComponent.
 */
export const Table: BlockInnerComponent = ({ block }) => {
  // Defensive: If no table data, render nothing
  const table = block.table;
  if (!table || !table.property) return null;

  const { row_size, column_size, header_row, header_column } = table.property;
  const cells = table.cells || [];

  // Build 2D array of cell IDs: [row][col]
  const cellGrid: (string | null)[][] = [];
  for (let r = 0; r < row_size; r++) {
    const row: (string | null)[] = [];
    for (let c = 0; c < column_size; c++) {
      row.push(cells[r * column_size + c] || null);
    }
    cellGrid.push(row);
  }

  // Build a 2D array to track merged cells and their spans
  // merge_info is a flat array, same order as cells
  // For each cell, if merge_info exists, set colSpan/rowSpan; otherwise, default to 1
  type MergeCell = {
    colSpan: number;
    rowSpan: number;
    covered: boolean; // true if this cell is covered by a previous cell's span
  };
  const mergeGrid: MergeCell[][] = [];
  for (let r = 0; r < row_size; r++) {
    const row: MergeCell[] = [];
    for (let c = 0; c < column_size; c++) {
      const idx = r * column_size + c;
      const info = table.property.merge_info?.[idx];
      row.push({
        colSpan: info?.col_span ?? 1,
        rowSpan: info?.row_span ?? 1,
        covered: false,
      });
    }
    mergeGrid.push(row);
  }

  // Mark covered cells (those that should be skipped due to merge)
  for (let r = 0; r < row_size; r++) {
    for (let c = 0; c < column_size; c++) {
      const { colSpan, rowSpan } = mergeGrid[r][c];
      if (colSpan > 1 || rowSpan > 1) {
        for (let dr = 0; dr < rowSpan; dr++) {
          for (let dc = 0; dc < colSpan; dc++) {
            if (dr === 0 && dc === 0) continue; // skip the top-left cell
            const rr = r + dr;
            const cc = c + dc;
            if (rr < row_size && cc < column_size) {
              mergeGrid[rr][cc].covered = true;
            }
          }
        }
      }
    }
  }

  // Render table
  return (
    <div className="reark-table-wrapper">
      <table className="reark-table">
        <tbody>
          {cellGrid.map((row, r) => (
            <tr key={r}>
              {row.map((cellId, c) => {
                const merge = mergeGrid[r][c];
                if (merge.covered || !cellId) return null;

                // Determine if this cell is a header cell
                const isHeader =
                  (header_row && r === 0) || (header_column && c === 0);

                const CellTag = isHeader ? "th" : "td";

                return (
                  <CellTag
                    key={c}
                    colSpan={merge.colSpan > 1 ? merge.colSpan : undefined}
                    rowSpan={merge.rowSpan > 1 ? merge.rowSpan : undefined}
                    className={[
                      isHeader ? "reark-table__th" : "reark-table__td",
                      merge.colSpan > 1 || merge.rowSpan > 1
                        ? "reark-table__merged"
                        : "",
                    ].join(" ")}
                  >
                    <BlockComponent blockId={cellId} />
                  </CellTag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
