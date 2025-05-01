import { css } from "@emotion/react";
import React, { createContext, useContext, useEffect, useState } from "react";

type CommentProps = {
  commentIds: string[];
  children: React.ReactNode;
};

interface CommentContextType {
  registerChild: () => void;
  unregisterChild: () => void;
}

const CommentContext = createContext<CommentContextType | null>(null);

export function Comment({ commentIds, children }: CommentProps) {
  const [childCount, setChildCount] = useState(0);
  const parentContext = useContext(CommentContext);

  // Register with parent comment when mounted
  useEffect(() => {
    if (parentContext) {
      parentContext.registerChild();
      return () => parentContext.unregisterChild();
    }
  }, [parentContext]);

  // A leaf comment has no child comments
  const isLeaf = childCount === 0;

  const style = css({
    display: "contents",
    ...(isLeaf
      ? {
          "& > *": {
            borderBottom: "2px solid #fc0",
          },
        }
      : {}),
  });

  return (
    <CommentContext.Provider
      value={{
        registerChild: () => setChildCount((count) => count + 1),
        unregisterChild: () => setChildCount((count) => count - 1),
      }}
    >
      <div css={style} data-comment-ids={commentIds.join(",")}>
        {children}
      </div>
    </CommentContext.Provider>
  );
}
