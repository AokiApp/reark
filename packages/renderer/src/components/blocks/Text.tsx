import { BlockInnerComponent } from "../../types";
import type {
  TextElement,
  TextElementStyle,
  TextStyle,
} from "@aokiapp/reark-lark-api";
import { Comment } from "../Comment";
import { useBlockStore } from "../../contexts/BlockStoreContext";
import { InlineView } from "../FileUtils";
import { MathJaxSvg } from "../MathJaxSvg";
import { ReactNode } from "react";

// Helper function to get text alignment style
const getTextAlign = (align?: number): "left" | "center" | "right" => {
  switch (align) {
    case 2:
      return "center";
    case 3:
      return "right";
    default:
      return "left";
  }
};

// Helper function to build class name based on text element style
const buildTexElSty = (textElementStyle?: TextElementStyle) => {
  return [
    textElementStyle?.bold ? "reark-text--bold" : "",
    textElementStyle?.italic ? "reark-text--italic" : "",
    textElementStyle?.strikethrough ? "reark-text--strikethrough" : "",
    textElementStyle?.underline ? "reark-text--underline" : "",
    textElementStyle?.inline_code ? "reark-text--inline-code" : "",
    "reark-text",
  ]
    .filter(Boolean)
    .join(" ");
};

export const TextInner: React.FC<{
  elements: TextElement[];
}> = ({ elements }) => {
  const blockStore = useBlockStore();
  return elements.map((element, index) => {
    let inner;
    let textElementStyle;

    if (element.text_run) {
      // Handle text run element
      textElementStyle = element.text_run.text_element_style;
      const classNames = buildTexElSty(textElementStyle);

      let frag: ReactNode;

      if (element.text_run.text_element_style?.link) {
        // Handle link element
        const link = element.text_run.text_element_style.link;
        const url = decodeURIComponent(link.url);
        frag = (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="reark-text--link"
          >
            {element.text_run.content}
          </a>
        );
      } else if (/^https?:\/\//.test(element.text_run.content)) {
        // Handle URL element
        frag = (
          <a
            key={index}
            href={element.text_run.content}
            target="_blank"
            rel="noopener noreferrer"
            className="reark-text--link"
          >
            {element.text_run.content}
          </a>
        );
      } else {
        // Handle plain text element
        frag = element.text_run.content;
      }

      inner = (
        <span key={index} className={classNames}>
          {frag}
        </span>
      );
    } else if (element.equation) {
      // Handle equation element
      textElementStyle = element.equation.text_element_style;
      const classNames = buildTexElSty(textElementStyle);
      inner = (
        <span key={index} className={classNames}>
          <MathJaxSvg tex={element.equation.content} />
        </span>
      );
    } else if (element.inline_block) {
      // Handle inline block element
      textElementStyle = element.inline_block.text_element_style;
      const classNames = buildTexElSty(textElementStyle);

      if (!element.inline_block.block_id) {
        return null;
      }

      const fileBlock = blockStore.blocks[element.inline_block.block_id];
      if (fileBlock?.block_type === 23 && fileBlock?.file) {
        inner = (
          <span key={index} className={classNames}>
            <InlineView fileBlock={fileBlock.file!} />
          </span>
        );
      }
    }

    // Handle comments attached to text
    const commentIds = textElementStyle?.comment_ids;
    if (Array.isArray(commentIds) && commentIds.length > 0) {
      return (
        <Comment commentIds={commentIds} key={index}>
          {inner}
        </Comment>
      );
    }

    return inner;
  });
};

// Component for rendering text elements
export const Text: React.FC<{
  elements: TextElement[];
  style?: TextStyle;
}> = ({ elements, style }) => {
  const textAlign = getTextAlign(style?.align);

  return (
    <div style={{ textAlign }} className="reark-text-block">
      <TextInner elements={elements} />
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
