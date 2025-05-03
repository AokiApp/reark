import { createContext, useContext } from "react";
import type { Block, CommentData } from "@aokiapp/reark-lark-api";

// Context value type
export type LarkApiContextValue = {
  blocks?: Block[];
  comments?: CommentData[];
  files?: Record<string, string>; // fileToken → public URL
};

// Create the context
export const LarkApiContext = createContext<LarkApiContextValue>({});

// Hook for consumers
export const useLarkApi = () => useContext(LarkApiContext);
