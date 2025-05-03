import { BlockInnerComponent } from "../../types";
import { CODE_LANGUAGE } from "../../constants/codeLanguage";
import { Text } from "./Text";

export const CodeBlock: BlockInnerComponent = ({ block }) => {
  const code = block.code;
  if (!code) {
    return null;
  }
  const codeLanguage = code?.style?.language
    ? CODE_LANGUAGE[code.style.language]
    : "Unknown";

  return (
    <div className="reark-codeblock">
      <div className="reark-codeblock__language">{codeLanguage}</div>
      <pre className="reark-codeblock__pre">
        <Text elements={code.elements} style={code.style} />
      </pre>
    </div>
  );
};
// todo : copy button
