import { BlockInnerComponent } from "../../types";
import { EMOJI } from "../../constants/emoji";
import { CALLOUT_BACKGROUND_COLOR } from "../../styles/calloutBackgroundColor";
import { CALLOUT_BORDER_COLOR } from "../../styles/calloutBorderColor";
import { BlockComponent } from "../BlockComponent";

export const Callout: BlockInnerComponent = ({ block }) => {
  const callout = block.callout;

  if (!callout?.emoji_id) {
    return null;
  }

  const emoji = EMOJI[callout.emoji_id];
  const backgroundColor = CALLOUT_BACKGROUND_COLOR[callout.background_color];
  const borderColor = CALLOUT_BORDER_COLOR[callout.border_color];

  // Dynamic style for background/border color
  const customStyle = {
    backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: "8px",
  };

  return (
    <div className="reark-callout reark-callout--custom" style={customStyle}>
      <div className="reark-callout__emoji">{emoji}</div>
      <div className="reark-callout__content">
        {block.children?.map((childId) => (
          <BlockComponent key={childId} blockId={childId} />
        ))}
      </div>
    </div>
  );
};
