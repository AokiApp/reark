import { BlockInnerComponent } from "../../types";

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
  const textAlign =
    align === 1
      ? "left"
      : align === 2
        ? "center"
        : align === 3
          ? "right"
          : "left";

  return (
    <div
      className={`reark-heading reark-heading--${level}`}
      style={{ textAlign }}
    >
      {headingData.elements.map((element, index) => {
        if (!element.text_run) {
          return null;
        }

        const textElementStyle = element.text_run.text_element_style;

        // Build className for text decorations
        const classNames = [
          textElementStyle?.bold ? "reark-text--bold" : "",
          textElementStyle?.italic ? "reark-text--italic" : "",
          textElementStyle?.strikethrough ? "reark-text--strikethrough" : "",
          textElementStyle?.underline ? "reark-text--underline" : "",
          textElementStyle?.inline_code ? "reark-text--inline-code" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <span key={index} className={classNames}>
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
