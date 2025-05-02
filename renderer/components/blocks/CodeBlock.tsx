import { BlockInnerComponent } from "../../types";
import { CODE_LANGUAGE } from "../../constants/codeLanguage";
import type { Element } from "../../../lark-api";

export const CodeBlock: BlockInnerComponent = ({ block }) => {
  const code = block.code;
  const codeLanguage = code?.style?.language
    ? CODE_LANGUAGE[code.style.language]
    : "Unknown";

  const content = code?.elements
    .map((element: Element) => element.text_run?.content || "")
    .join("");

  return (
    <div className="reark-codeblock">
      <div className="reark-codeblock__language">{codeLanguage}</div>
      <pre className="reark-codeblock__pre">
        <code>{content}</code>
      </pre>
    </div>
  );
};
