import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { useContext } from "react";
import { LarkApiContext } from "../../contexts/LarkApiContext";

const imageWrapperStyle = css({
  position: "relative",
  maxWidth: "100%",
});

const containerStyle = css({
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
});

const imageStyle = css({
  display: "block",
  maxWidth: "100%",
  height: "auto",
  transition: "opacity 0.3s ease",
});

const placeholderStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#666",
  fontSize: "14px",
});

export const Image: BlockInnerComponent = ({ block }) => {
  const { files } = useContext(LarkApiContext);

  if (!block.image) {
    return null;
  }

  const { width, height, token } = block.image;
  if (!width || !height || !token) {
    return null;
  }

  const url = files?.[token];

  return (
    <div css={imageWrapperStyle}>
      <div css={containerStyle}>
        {!url ? (
          <div css={placeholderStyle}>Image not available</div>
        ) : (
          <img
            src={url}
            alt=""
            css={imageStyle}
            width={width}
            height={height}
          />
        )}
      </div>
    </div>
  );
};
