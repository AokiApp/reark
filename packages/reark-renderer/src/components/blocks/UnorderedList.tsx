import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import { Text } from "./Text";

import { css } from "@emotion/react";

const sty = css({
  paddingLeft: "24px",
  position: "relative",
  "::before": {
    content: '""',
    display: "block",
    // round small dot
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#000",
    position: "absolute",
    top: "0.5em",
    left: "0px",
  },
});

export const UnorderedList: BlockInnerComponent = ({ block }) => {
  const bullet = block.bullet;

  if (!bullet?.elements) {
    return null;
  }

  return (
    <div css={sty}>
      <Text {...bullet} />
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
