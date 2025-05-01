import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import { css } from "@emotion/react";

export const Table: BlockInnerComponent = ({ block }) => {
  const tableStyle = css({
    borderCollapse: "collapse",
    width: "100%",
    margin: "16px 0",
  });

  const thStyle = (width?: string) =>
    css({
      border: "1px solid #ccc",
      padding: "8px",
      textAlign: "left",
      backgroundColor: "#f5f5f5",
      width: width || "auto",
      verticalAlign: "top",
    });

  const tdStyle = css({
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
    verticalAlign: "top",
  });

  const tableProperty = block.table?.property;
  const rowSize = tableProperty?.row_size ?? 0;
  const columnSize = tableProperty?.column_size ?? 0;
  const columnWidth = tableProperty?.column_width ?? [];
  const headerRow = tableProperty?.header_row ?? false;
  //const headerColumn = tableProperty.header_column;
  //const mergeInfo = tableProperty.merge_info;

  // 一次元配列を行ごとに分割
  const cells = block.table?.cells || [];
  const rows = Array.from({ length: rowSize }, (_, rowIndex) =>
    cells.slice(rowIndex * columnSize, (rowIndex + 1) * columnSize),
  );

  return (
    <table css={tableStyle}>
      {headerRow && rows.length > 0 && (
        <thead>
          <tr>
            {rows[0].map((cell, index) => (
              <th
                key={index}
                css={thStyle(
                  columnWidth ? `${columnWidth[index]}px` : undefined,
                )}
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
              <td key={colIndex} css={tdStyle}>
                <BlockComponent key={cell} blockId={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
