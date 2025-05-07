import { BlockInnerComponent } from "../../types";
import { Text } from "./Text";

/**
 * BlockType 15: Quote Block
 * Lark仕様に基づき、TextBlockと同じ構造だが、引用用の装飾を追加
 */
export const QuoteBlock: BlockInnerComponent = ({ block }) => {
  return (
    <blockquote className="reark-quote-block">
      <Text elements={block.quote?.elements ?? []} style={block.quote?.style} />
    </blockquote>
  );
};
