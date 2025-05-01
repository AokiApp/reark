import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { EMOJI } from "../../constants/emoji";
import { CALLOUT_BACKGROUND_COLOR } from "../../styles/calloutBackgroundColor";
import { CALLOUT_BORDER_COLOR } from "../../styles/calloutBorderColor";
import { BlockComponent } from "../BlockComponent";

const calloutContainerStyle = css({
  display: "flex",
  alignItems: "flex-start",
  padding: "16px",
  backgroundColor: "#f5f6f7",
  borderRadius: "4px",
  marginTop: "16px",
  marginBottom: "16px",
  gap: "12px",
});

const emojiStyle = css({
  fontSize: "20px",
  lineHeight: "24px",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const contentStyle = css({
  flex: 1,
  "& > *:last-child": {
    marginBottom: 0,
  },
});

export const Callout: BlockInnerComponent = ({ block }) => {
  const callout = block.callout;

  if (!callout?.emoji_id) {
    return null;
  }

  const emoji = EMOJI[callout.emoji_id];
  const backgroundColor = CALLOUT_BACKGROUND_COLOR[callout.background_color];
  const borderColor = CALLOUT_BORDER_COLOR[callout.border_color];

  const customCalloutStyle = css({
    backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: "8px",
  });

  return (
    <div css={[calloutContainerStyle, customCalloutStyle]}>
      <div css={emojiStyle}>{emoji}</div>
      <div css={contentStyle}>
        {block.children?.map((childId) => (
          <BlockComponent key={childId} blockId={childId} />
        ))}
      </div>
    </div>
  );
};
