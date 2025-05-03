import { BlockInnerComponent } from "../../types";
import { CODE_LANGUAGE } from "../../constants/codeLanguage";
import { Text } from "./Text";
import type { TextElement } from "@aokiapp/reark-lark-api";

export const CodeBlock: BlockInnerComponent = ({ block }) => {
  const code = block.code;

  if (!code) {
    return null;
  }
  const codeLanguage = code?.style?.language
    ? CODE_LANGUAGE[code.style.language]
    : "Unknown";

  // Get plain text for copying
  const getPlainText = () => {
    return (
      (code.elements as TextElement[])
        ?.map((el) => el.text_run?.content || "")
        .join("") || ""
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getPlainText());
    } catch (e) {
      // fallback or error handling
    }
  };

  return (
    <div className="reark-codeblock">
      <div className="reark-codeblock__header">
        <span className="reark-codeblock__language">{codeLanguage}</span>
        <button
          className="reark-codeblock__copy-btn"
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
        >
          Copy
        </button>
      </div>
      <pre className="reark-codeblock__pre">
        <Text elements={code.elements} style={code.style} />
      </pre>
    </div>
  );
};
