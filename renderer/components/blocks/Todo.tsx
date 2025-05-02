import { BlockInnerComponent } from "../../types";
import type { Element } from "../../../lark-api";
import { containsUrl } from "../../utils/utils";

export const Todo: BlockInnerComponent = ({ block }) => {
  const todo = block.todo;

  if (!todo?.elements) {
    return null;
  }

  const isDone = todo.style?.done || false;
  const align = todo.style?.align || 1;
  const textAlign =
    align === 1
      ? "left"
      : align === 2
        ? "center"
        : align === 3
          ? "right"
          : "left";

  return (
    <div className="reark-todo" style={{ textAlign }}>
      <input
        type="checkbox"
        checked={isDone}
        className="reark-todo__checkbox"
        readOnly
      />
      <div
        className={
          "reark-todo__content" + (isDone ? " reark-todo__content--done" : "")
        }
      >
        {todo.elements.map((element: Element, index: number) => {
          if (!element.text_run) {
            return null;
          }

          const textElementStyle = element.text_run.text_element_style;

          // Build className for text decorations, including done state
          const classNames = [
            isDone ? "reark-text--strikethrough" : "",
            textElementStyle?.bold ? "reark-text--bold" : "",
            textElementStyle?.italic ? "reark-text--italic" : "",
            textElementStyle?.strikethrough ? "reark-text--strikethrough" : "",
            textElementStyle?.underline ? "reark-text--underline" : "",
            textElementStyle?.inline_code ? "reark-text--inline-code" : "",
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

          return (
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
        })}
      </div>
    </div>
  );
};
