import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";

export const Table: BlockInnerComponent = ({ block }) => {
  const tableProperty = block.table?.property;
  const rowSize = tableProperty?.row_size ?? 0;
  const columnSize = tableProperty?.column_size ?? 0;
  const columnWidth = tableProperty?.column_width ?? [];
  const headerRow = tableProperty?.header_row ?? false;

  // 一次元配列を行ごとに分割
  const cells = block.table?.cells || [];
  const rows = Array.from({ length: rowSize }, (_, rowIndex) =>
    cells.slice(rowIndex * columnSize, (rowIndex + 1) * columnSize),
  );

  return (
    <table className="reark-table">
      {headerRow && rows.length > 0 && (
        <thead>
          <tr>
            {rows[0].map((cell, index) => (
              <th
                key={index}
                className="reark-table__th"
                style={
                  columnWidth && columnWidth[index]
                    ? { width: `${columnWidth[index]}px` }
                    : undefined
                }
              >
                <BlockComponent key={cell} blockId={cell} />
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.slice(headerRow ? 1 : 0).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex} className="reark-table__td">
                <BlockComponent key={cell} blockId={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
