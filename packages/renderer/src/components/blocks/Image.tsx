import { BlockInnerComponent } from "../../types";
import { useContext } from "react";
import { LarkApiContext } from "../../contexts/LarkApiContext";

export const Image: BlockInnerComponent = ({ block }) => {
  const { files } = useContext(LarkApiContext);

  if (!block.image) {
    return null;
  }

  const { width, height, token } = block.image;
  if (!width || !height || !token) {
    return null;
  }

  const align = block.image.align || 1; // Default to left alignment
  const justifyContent =
    ["", "flex-start", "center", "flex-end"][align] || "flex-start";

  const url = files?.[token];

  return (
    <div className="reark-image-container" style={{ justifyContent }}>
      {!url ? (
        <div className="reark-image-placeholder">Image not available</div>
      ) : (
        <img
          src={url}
          alt=""
          className="reark-image"
          width={width}
          height={height}
        />
      )}
    </div>
  );
};
