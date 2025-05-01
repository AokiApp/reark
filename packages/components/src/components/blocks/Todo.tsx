import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { Element } from "../../types/block";
import { containsUrl } from "../../utils/utils";

const todoContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const checkboxStyle = css({
  width: "16px",
  height: "16px",

  appearance: "none",
  border: "2px solid #666",
  borderRadius: "3px",
  position: "relative",
  cursor: "pointer",
  "&:checked": {
    backgroundColor: "#1a73e8",
    borderColor: "#1a73e8",
    "&::after": {
      content: '""',
      position: "absolute",
      left: "4px",
      top: "1px",
      width: "4px",
      height: "8px",
      border: "solid white",
      borderWidth: "0 2px 2px 0",
      transform: "rotate(45deg)",
    },
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(26, 115, 232, 0.2)",
  },
});

const contentStyle = css({
  flex: 1,
});

const doneTextStyle = css({
  textDecoration: "line-through",
  color: "#666",
});

export const Todo: BlockInnerComponent = ({ block }) => {
  const todo = block.todo;

  if (!todo?.elements) {
    return null;
  }

  const isDone = todo.style?.done || false;
  const align = todo.style?.align || 1;

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
    <div css={[todoContainerStyle, containerStyle]}>
      <input type="checkbox" checked={isDone} css={checkboxStyle} readOnly />
      <div css={[contentStyle, isDone && doneTextStyle]}>
        {todo.elements.map((element: Element, index: number) => {
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
                isDone && "line-through",
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

          return (
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
        })}
      </div>
    </div>
  );
};
