import { useBlockStore } from "../../contexts/BlockStoreContext";
import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import { Text } from "./Text";

export const OrderedList: BlockInnerComponent = ({ block }) => {
  const blockStore = useBlockStore();

  const ordered = block.ordered;

  if (!ordered?.elements) {
    return null;
  }

  let seq = ordered.style?.sequence;
  if (seq === "auto") {
    if (
      block.parent_id &&
      blockStore.blocks[block.parent_id] &&
      Array.isArray(blockStore.blocks[block.parent_id].children)
    ) {
      const idx = blockStore.blocks[block.parent_id].children!.findIndex(
        (childId) => childId === block.block_id,
      );
      seq = idx >= 0 ? String(idx + 1) : "";
    } else {
      seq = "";
    }
  }

  // Set the sequence number as a CSS variable for ::before content
  const style = {
    "--reark-ordered-list-seq": `"${seq}"`,
  } as React.CSSProperties;

  return (
    <div
      className="reark-ordered-list"
      style={{
        ...style,
      }}
    >
      <Text {...ordered} />
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
