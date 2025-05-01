import { useBlockStore } from "../../contexts/BlockStoreContext";
import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import { Text } from "./Text";

import { css } from "@emotion/react";

export const OrderedList: BlockInnerComponent = ({ block }) => {
  const blockStore = useBlockStore();

  const ordered = block.ordered;

  if (!ordered?.elements) {
    return null;
  }

  let seq = ordered.style?.sequence;
  if (seq === "auto") {
    seq =
      blockStore.blocks[block.parent_id].children!.findIndex(
        (childId) => childId === block.block_id,
      ) + 1;
  }

  const sty = css({
    paddingLeft: "24px",
    position: "relative",
    "::before": {
      content: `"${seq}"`,
      display: "block",
      position: "absolute",
      top: "0em",
      left: "0px",
    },
  });

  return (
    <div css={sty}>
      <Text {...ordered} />
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
