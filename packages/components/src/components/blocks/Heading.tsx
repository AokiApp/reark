import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";

const HEADING_SIZES = {
  1: "32px", // h1
  2: "28px", // h2
  3: "24px", // h3
  4: "20px", // h4
  5: "18px", // h5
  6: "16px", // h6
  7: "14px", // h7
  8: "13px", // h8
  9: "12px", // h9
};

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const HeadingBase: BlockInnerComponent<{
  level: HeadingLevel;
}> = ({ block, level }) => {
  const headingKey = `heading${level}` as const;
  const headingData = block[headingKey];

  if (!headingData?.elements) {
    return null;
  }

  const align = headingData.style?.align || 1;

  const headingStyle = css({
    fontSize: HEADING_SIZES[level],
    fontWeight: "bold",
    paddingTop: "12px",
    paddingBottom: "12px",
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
    <div css={headingStyle}>
      {headingData.elements.map((element, index) => {
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

        return (
          <span key={index} css={style}>
            {element.text_run.content}
          </span>
        );
      })}
    </div>
  );
};

export const Heading1: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={1} />
);
export const Heading2: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={2} />
);
export const Heading3: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={3} />
);
export const Heading4: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={4} />
);
export const Heading5: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={5} />
);
export const Heading6: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={6} />
);
export const Heading7: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={7} />
);
export const Heading8: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={8} />
);
export const Heading9: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={9} />
);
