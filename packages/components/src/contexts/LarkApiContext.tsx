import React, { createContext, useContext } from "react";
import type { Block } from "@aokiapp/reark-lark-api";
import type { CommentData } from "@aokiapp/reark-lark-api";
import { LarkRenderer } from "../components/LarkRenderer";

// Context value type
export interface LarkApiContextValue {
  blocks?: Block[];
  comments?: CommentData[];
  files?: Record<string, string>; // fileToken → public URL
}

// Props for the provider
export interface LarkApiProviderProps {
  initialData: LarkApiContextValue;
}

// Create the context
export const LarkApiContext = createContext<LarkApiContextValue>({});

// Provider: supplies context and renders the fixed renderer
export const LarkApiProvider: React.FC<LarkApiProviderProps> = ({
  initialData,
}) => {
  return (
    <LarkApiContext.Provider value={initialData}>
      <LarkRenderer />
    </LarkApiContext.Provider>
  );
};

// Hook for consumers
export const useLarkApi = () => useContext(LarkApiContext);
