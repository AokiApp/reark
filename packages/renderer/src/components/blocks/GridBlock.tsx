import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";

/**
 * GridBlock: Renders a grid container with a specified number of columns.
 * Each child is expected to be a GridColumnBlock.
 */
export const GridBlock: BlockInnerComponent = ({ block }) => {
  const grid = block.grid;
  if (!grid || !block.children || !Array.isArray(block.children)) {
    return null;
  }

  // column_size: number of columns (2-4)
  //const columnSize = grid.column_size || 2;

  // Render children by block reference (blockId), allowing for block reference resolution.
  return (
    <div className="reark-grid-wrapper">
      <div
        className="reark-grid"
        style={{
          display: "flex",
          //gridTemplateColumns: `repeat(${columnSize}, 1fr)`,
          gap: "16px",
        }}
      >
        {block.children.map((childId) => (
          // BlockComponent resolves and renders the block by its ID (block reference)
          <BlockComponent key={childId} blockId={childId} />
        ))}
      </div>
    </div>
  );
};
