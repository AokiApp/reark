import { BlockInnerComponent } from "../../types";
import type { TextElement, TextStyle } from "@aokiapp/reark-lark-api";
import { containsUrl } from "../../utils/utils";
import { Comment } from "../Comment";
import { useBlockStore } from "../../contexts/BlockStoreContext";
import { InlineView } from "../FileUtils";
import { MathJaxSvg } from "../MathJaxSvg";

export const Text: React.FC<{
  elements: TextElement[];
  style?: TextStyle;
}> = ({ elements, style }) => {
  const blockStore = useBlockStore();
  const align = style?.align || 1;
  const textAlign =
    align === 1
      ? "left"
      : align === 2
        ? "center"
        : align === 3
          ? "right"
          : "left";

  return (
    <div style={{ textAlign }} className="reark-text-block">
      {elements.map((element, index) => {
        let inner;
        let textElementStyle;
        if (element.text_run) {
          textElementStyle = element.text_run.text_element_style;

          // Build className for text decorations
          const classNames = [
            textElementStyle?.bold ? "reark-text--bold" : "",
            textElementStyle?.italic ? "reark-text--italic" : "",
            textElementStyle?.strikethrough ? "reark-text--strikethrough" : "",
            textElementStyle?.underline ? "reark-text--underline" : "",
            textElementStyle?.inline_code ? "reark-text--inline-code" : "",
            "reark-text",
          ]
            .filter(Boolean)
            .join(" ");

          //文字列にリンクが紐づいているor文字列がhttps://で始まる場合はリンクとして扱う
          let url = textElementStyle?.link?.url;
          let isUrl = false;
          if (url) {
            url = decodeURIComponent(url);
            isUrl = true;
          } else if (containsUrl(element.text_run.content)) {
            url = element.text_run.content;
            isUrl = true;
          }

          inner = (
            <span key={index} className={classNames}>
              {isUrl ? (
                <a href={url} target="_blank">
                  {element.text_run.content}
                </a>
              ) : (
                element.text_run.content
              )}
            </span>
          );
        } else if (element.equation) {
          textElementStyle = element.equation.text_element_style;
          const classNames = [
            textElementStyle?.bold ? "reark-text--bold" : "",
            textElementStyle?.italic ? "reark-text--italic" : "",
            textElementStyle?.strikethrough ? "reark-text--strikethrough" : "",
            textElementStyle?.underline ? "reark-text--underline" : "",
            textElementStyle?.inline_code ? "reark-text--inline-code" : "",
            "reark-text",
          ]
            .filter(Boolean)
            .join(" ");
          inner = (
            <span key={index} className={classNames}>
              <MathJaxSvg tex={element.equation.content} />
            </span>
          );
        } else if (element.inline_block) {
          textElementStyle = element.inline_block.text_element_style;

          // Build className for text decorations
          const classNames = [
            textElementStyle?.bold ? "reark-text--bold" : "",
            textElementStyle?.italic ? "reark-text--italic" : "",
            textElementStyle?.strikethrough ? "reark-text--strikethrough" : "",
            textElementStyle?.underline ? "reark-text--underline" : "",
            textElementStyle?.inline_code ? "reark-text--inline-code" : "",
            "reark-text",
          ]
            .filter(Boolean)
            .join(" ");
          if (!element.inline_block.block_id) {
            return null;
          }
          const fileBlock = blockStore.blocks[element.inline_block.block_id];
          if (fileBlock?.block_type === 23 && fileBlock?.file) {
            // is a file block
            inner = (
              <span key={index} className={classNames}>
                <InlineView fileBlock={fileBlock.file!} />
              </span>
            );
          }
        }

        //コメントが紐づけられている場合は、文字列にマーカーを付与
        const comment = textElementStyle?.comment_ids;

        if (Array.isArray(comment) && comment.length > 0) {
          return (
            <Comment commentIds={comment} key={index}>
              {inner}
            </Comment>
          );
        }

        return inner;
      })}
    </div>
  );
};

export const TextBlock: BlockInnerComponent = ({ block }) => {
  return (
    <Text
      elements={block.text?.elements as unknown as TextElement[]} // todo: safer way
      style={block.text?.style}
    />
  );
};
