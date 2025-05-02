import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import type { TextElement } from "../../../lark-api";
import { Text } from "./Text";
import "../../styles/blocks.css";

export const Page: BlockInnerComponent = ({ block }) => {
  return (
    <div>
      <div className="reark-page-title">
        <Text
          elements={block.page?.elements as unknown as TextElement[]} // todo: safer way
          style={block.text?.style}
        />
      </div>
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
