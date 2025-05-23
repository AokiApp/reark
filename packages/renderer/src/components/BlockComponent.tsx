import { ErrorBoundary } from "./ErrorBoundary";
import { useBlockStore } from "../contexts/BlockStoreContext";
import { Comment } from "./Comment";
import { BLOCK_COMPONENTS } from "../constants/blockComponents";
import { UnsupportedBlock } from "./blocks/UnsupportedBlock";

type Props = {
  blockId: string;
};

const DEV = false;

export function BlockComponent({ blockId }: Props) {
  const { blocks } = useBlockStore();
  const block = blocks[blockId];

  if (!block) {
    throw new Error(`Fatal: Block with ID ${blockId} not found`);
  }

  const Component = BLOCK_COMPONENTS[block.block_type] || UnsupportedBlock;

  // Development-only debug tool
  const showDebugInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    // クリックされた要素が <a> タグの場合は処理をスキップ
    if ((e.target as HTMLElement).tagName === "A") {
      return;
    }

    e.stopPropagation();
    e.preventDefault();
    console.group(`Block Debug Info: ${blockId}`);
    console.log("Block Data:", block);
    console.log("Parent Block Data:", blocks[block.parent_id || ""]);
    console.groupEnd();

    if (block.block_type === 22) {
      console.log(blocks);
    }
  };

  const inner = (
    <div className="reark-block" onClick={DEV ? showDebugInfo : undefined}>
      <ErrorBoundary>
        <Component block={block} />
      </ErrorBoundary>
    </div>
  );

  if (block.comment_ids) {
    return <Comment commentIds={block.comment_ids}>{inner}</Comment>;
  }
  return inner;
}
