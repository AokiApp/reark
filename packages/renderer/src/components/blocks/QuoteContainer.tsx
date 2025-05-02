import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";

export const QuoteContainer: BlockInnerComponent = ({ block }) => {
  return (
    <div className="reark-quote-container">
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
