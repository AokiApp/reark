import { BlockInnerComponent } from "../../types";

export const UnsupportedBlock: BlockInnerComponent = ({
  block: { block_type },
}) => (
  <div className="reark-unsupported-block">
    <strong>Unsupported block type: {block_type}</strong>
  </div>
);
