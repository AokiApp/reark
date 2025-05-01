import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";

const dividerStyle = css({
  height: "1px",
  backgroundColor: "#e1e4e8",
  border: "none",
  margin: "24px 0",
  width: "100%",
});

export const Divider: BlockInnerComponent = () => {
  return <hr css={dividerStyle} />;
};
