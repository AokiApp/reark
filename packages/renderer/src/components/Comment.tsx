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

  return (
    <CommentContext.Provider
      value={{
        registerChild: () => setChildCount((count) => count + 1),
        unregisterChild: () => setChildCount((count) => count - 1),
      }}
    >
      <div
        className={`reark-comment${isLeaf ? " reark-comment--leaf" : ""}`}
        data-comment-ids={commentIds.join(",")}
      >
        {children}
      </div>
    </CommentContext.Provider>
  );
}
