import React from "react";
import { css } from "@emotion/react";

const unsupportedBlockStyle = css({
  fontSize: "14px",
  padding: "12px",
  margin: "8px 0",
  backgroundColor: "#fff3f3",
  border: "1px solid #dc3545",
  borderRadius: "4px",
  color: "#dc3545",
});

export interface UnsupportedBlockProps {
  type: number;
}

export const UnsupportedBlock: React.FC<UnsupportedBlockProps> = ({ type }) => (
  <div css={unsupportedBlockStyle}>
    <strong>Unsupported block type: {type}</strong>
  </div>
);
