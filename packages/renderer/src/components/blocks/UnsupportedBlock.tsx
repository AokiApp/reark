import React from "react";

export interface UnsupportedBlockProps {
  type: number;
}

export const UnsupportedBlock: React.FC<UnsupportedBlockProps> = ({ type }) => (
  <div className="reark-unsupported-block">
    <strong>Unsupported block type: {type}</strong>
  </div>
);
