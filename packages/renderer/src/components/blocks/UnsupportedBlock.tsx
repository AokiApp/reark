import { BlockInnerComponent } from "../../types";

export const UnsupportedBlock: BlockInnerComponent = (props) => {
  const block_type = props?.block?.block_type ?? "unknown";
  return (
    <div className="reark-unsupported-block">
      <strong>Unsupported block type: {block_type}</strong>
    </div>
  );
};
