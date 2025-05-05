import { BlockInnerComponent } from "../../types";
import { useBlockStore } from "../../contexts/BlockStoreContext";
import "../../styles/ViewBlock.css";
import { CardView, InlineView, PreviewView } from "../FileUtils";

export const ViewBlock: BlockInnerComponent = ({ block }) => {
  const blockStore = useBlockStore();

  if (
    block.block_type !== 33 ||
    typeof block.view?.view_type !== "number" ||
    !Array.isArray(block.children) ||
    block.children.length !== 1 ||
    blockStore.blocks[block.children[0]]?.block_type !== 23
  ) {
    throw new Error(
      "ViewBlock must have exactly one child of type 23 (FileBlock).",
    );
  }
  const fileBlock = blockStore.blocks[block.children[0]].file;
  if (!fileBlock) {
    throw new Error("FileBlock data is missing.");
  }

  const viewType = block.view.view_type;
  switch (viewType) {
    case 1:
      return <CardView fileBlock={fileBlock} />;
    case 2:
      return <PreviewView fileBlock={fileBlock} />;
    case 3:
      return <InlineView fileBlock={fileBlock} />;
    default:
      throw new Error(`Unsupported view type: ${viewType}`);
  }
};
