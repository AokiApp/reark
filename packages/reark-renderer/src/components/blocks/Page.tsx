import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";
import { css } from "@emotion/react";
import { TextElement } from "../../types/block";
import { Text } from "./Text";

export const Page: BlockInnerComponent = ({ block }) => {
  const fontStyle = css({
    fontSize: "2.5em", // 文字の大きさを追加
  });

  return (
    <div>
      <div css={fontStyle}>
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
