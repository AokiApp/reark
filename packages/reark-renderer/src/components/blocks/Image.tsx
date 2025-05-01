import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { useState, useEffect } from "react";
import { getFile } from "../../apis";

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

const errorStyle = css({
  padding: "16px",
  backgroundColor: "#fff3f3",
  color: "#dc3545",
  borderRadius: "4px",
  fontSize: "14px",
  textAlign: "center",
});

export const Image: BlockInnerComponent = ({ block }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!block.image?.token) {
      return;
    }
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const blob = await getFile(block.image?.token ?? "");
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load image");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.image?.token]);

  if (!block.image) {
    return null;
  }

  const { width, height, token } = block.image;
  if (!width || !height || !token) {
    return null;
  }

  return (
    <div css={imageWrapperStyle}>
      <div css={containerStyle}>
        {isLoading && <div css={placeholderStyle}>Loading...</div>}
        {error ? (
          <div css={errorStyle}>{error}</div>
        ) : (
          <img
            src={imageUrl}
            alt=""
            css={[imageStyle, { opacity: isLoading ? 0 : 1 }]}
            onLoad={() => {
              setIsLoading(false);
              setError(null);
            }}
            onError={() => {
              setIsLoading(false);
              setError("Cannot show image");
            }}
            width={width}
            height={height}
          />
        )}
      </div>
    </div>
  );
};
