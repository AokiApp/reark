import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import "../../styles/blocks.css";

export const Page: BlockInnerComponent = ({ block }) => {
  return (
    <div className="reark-page">
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
