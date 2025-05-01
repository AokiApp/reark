import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { CODE_LANGUAGE } from "../../constants/codeLanguage";
import { Element } from "../../types/block";

const boxStyle = css({
  backgroundColor: "#f5f5f5",
  border: "1px solid #a9a9a9",
  borderRadius: "3px",
  marginTop: "16px",
  marginBottom: "16px",
});

const codeBlockStyle = css({
  padding: "8px 8px 8px 8px",
  fontFamily: "monospace",
  fontSize: "14px",
  lineHeight: "1.5",
  overflowX: "auto",
  whiteSpace: "pre",
});

const languageTagStyle = css({
  display: "inline-block",
  padding: "6px 6px",
  borderRadius: "3px",
  fontSize: "12px",
  color: "gray",
});

export const CodeBlock: BlockInnerComponent = ({ block }) => {
  const code = block.code;
  const codeLanguage = code?.style?.language
    ? CODE_LANGUAGE[code.style.language]
    : "Unknown";

  const content = code?.elements
    .map((element: Element) => element.text_run?.content || "")
    .join("");

  return (
    <div css={boxStyle}>
      <div css={languageTagStyle}>{codeLanguage}</div>
      <pre css={codeBlockStyle}>
        <code>{content}</code>
      </pre>
    </div>
  );
};
