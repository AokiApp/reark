import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { TextElement, TextStyle } from "../../types/block";
import { containsUrl } from "../../utils/utils";
import { Comment } from "../Comment";

const textContainerStyle = css({});

export const Text: React.FC<{
  elements: TextElement[];
  style?: TextStyle;
}> = ({ elements, style }) => {
  const align = style?.align || 1;
  const containerStyle = css({
    textAlign:
      align === 1
        ? "left"
        : align === 2
          ? "center"
          : align === 3
            ? "right"
            : "left",
  });

  return (
    <div css={[textContainerStyle, containerStyle]}>
      {elements.map((element, index) => {
        if (!element.text_run) {
          return null;
        }

        const textElementStyle = element.text_run.text_element_style;

        const style = css({
          color: textElementStyle?.bold ? "#000" : "#333",
          fontWeight: textElementStyle?.bold ? "bold" : "normal",
          fontStyle: textElementStyle?.italic ? "italic" : "normal",
          textDecoration:
            [
              textElementStyle?.strikethrough && "line-through",
              textElementStyle?.underline && "underline",
            ]
              .filter(Boolean)
              .join(" ") || "none",
          fontFamily: textElementStyle?.inline_code ? "monospace" : "inherit",
          backgroundColor: textElementStyle?.inline_code
            ? "#f6f8fa"
            : "transparent",
          padding: textElementStyle?.inline_code ? "2px 4px" : "0",
          borderRadius: textElementStyle?.inline_code ? "3px" : "0",
        });

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

        const inner = (
          <span key={index} css={style}>
            {isUrl ? (
              <a href={url} target="_blank">
                {element.text_run.content}
              </a>
            ) : (
              element.text_run.content
            )}
          </span>
        );

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
