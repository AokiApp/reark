import React, { memo } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { useBlockStore } from "../contexts/BlockStoreContext";
import { css } from "@emotion/react";
import { Comment } from "./Comment";
import { BLOCK_COMPONENTS } from "../constants/blockComponents";

const unsupportedBlockStyle = css({
  fontSize: "14px",
  padding: "12px",
  margin: "8px 0",
  backgroundColor: "#fff3f3",
  border: "1px solid #dc3545",
  borderRadius: "4px",
  color: "#dc3545",
});

interface UnsupportedBlockProps {
  type: number;
  error?: string;
}

const UnsupportedBlock: React.FC<UnsupportedBlockProps> = ({ type, error }) => (
  <div css={unsupportedBlockStyle}>
    <strong>Unsupported block type: {type}</strong>
    {error && <div>{error}</div>}
  </div>
);

interface BlockComponentProps {
  blockId: string;
}

const BlockComponentBase: React.FC<BlockComponentProps> = ({ blockId }) => {
  const { blocks } = useBlockStore();
  const block = blocks[blockId];

  if (!block) {
    return <UnsupportedBlock type={-1} error={`Block ${blockId} not found`} />;
  }

  const Component = BLOCK_COMPONENTS[block.block_type];

  if (!Component) {
    return <UnsupportedBlock type={block.block_type} />;
  }

  // Development-only debug tool
  const showDebugInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    // クリックされた要素が <a> タグの場合は処理をスキップ
    if ((e.target as HTMLElement).tagName === "A") {
      return;
    }

    if (import.meta.env.DEV) {
      e.stopPropagation();
      e.preventDefault();
      console.group(`Block Debug Info: ${blockId}`);
      console.log("Block Data:", block);
      console.log("Parent Block Data:", blocks[block.parent_id]);
      console.groupEnd();
    }
  };

  const inner = (
    <div
      style={{ display: "contents" }}
      onClick={import.meta.env.DEV ? showDebugInfo : undefined}
    >
      <ErrorBoundary>
        <Component block={block} />
      </ErrorBoundary>
    </div>
  );

  if (block.comment_ids) {
    return <Comment commentIds={block.comment_ids}>{inner}</Comment>;
  }
  return inner;
};

export const BlockComponent = memo(BlockComponentBase);
BlockComponent.displayName = "BlockComponent";
