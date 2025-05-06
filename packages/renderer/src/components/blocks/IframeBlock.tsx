import React from "react";
import { BlockInnerComponent } from "../../types";

function decodeUrl(url: string): string {
  try {
    return decodeURIComponent(url);
  } catch {
    return url;
  }
}

export const IframeBlock: BlockInnerComponent = ({ block }) => {
  const component = block.iframe?.component;
  if (!component) return null;

  const { iframe_type, url } = component;
  const decodedUrl = decodeUrl(url);

  if (iframe_type === 15) {
    // YouTube埋め込み
    // URL例: https://www.youtube.com/watch?v=xxxx
    // 埋め込み用URLに変換
    let embedUrl = "";
    const match = decodedUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/,
    );
    if (match && match[1]) {
      embedUrl = `https://www.youtube.com/embed/${match[1]}`;
    } else {
      embedUrl = decodedUrl;
    }
    return (
      <div className="reark-iframe">
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        />
      </div>
    );
  } else {
    // 汎用iframe
    return (
      <div className="reark-iframe">
        <iframe
          src={decodedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded Content"
        />
      </div>
    );
  }
};
