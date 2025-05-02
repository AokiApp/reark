import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import { Text } from "./Text";

export const UnorderedList: BlockInnerComponent = ({ block }) => {
  const bullet = block.bullet;

  if (!bullet?.elements) {
    return null;
  }

  return (
    <div className="reark-unordered-list">
      <Text {...bullet} />
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
