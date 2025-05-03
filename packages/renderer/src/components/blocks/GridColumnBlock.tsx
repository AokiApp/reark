import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";

/**
 * GridColumnBlock: Renders a single column in a grid, with optional width ratio.
 * Children can be any block type.
 */
export const GridColumnBlock: BlockInnerComponent = ({ block }) => {
  const gridColumn = block.grid_column;
  if (!block.children || !Array.isArray(block.children)) {
    return null;
  }

  // width_ratio: ratio of this column to the whole grid (1-99)
  const widthRatio = gridColumn?.width_ratio || 1;

  // Render children by block reference (blockId), allowing for block reference resolution.
  return (
    <div
      className="reark-grid-column"
      style={{
        flex: widthRatio,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {block.children.map((childId) => (
        // BlockComponent resolves and renders the block by its ID (block reference)
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
