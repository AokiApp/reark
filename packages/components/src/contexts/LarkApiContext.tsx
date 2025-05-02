import { createContext, useContext } from "react";
import type { Block, CommentData } from "@aokiapp/reark-lark-api";
import { LarkRenderer } from "../components/LarkRenderer";

// Context value type
export type LarkApiContextValue = {
  blocks?: Block[];
  comments?: CommentData[];
  files?: Record<string, string>; // fileToken → public URL
};

// Props for the provider
type LarkApiProviderProps = {
  initialData: LarkApiContextValue;
};

// Create the context
export const LarkApiContext = createContext<LarkApiContextValue>({});

// Provider: supplies context and renders the fixed renderer
export const LarkApiProvider = ({ initialData }: LarkApiProviderProps) => {
  return (
    <LarkApiContext.Provider value={initialData}>
      <LarkRenderer />
    </LarkApiContext.Provider>
  );
};

// Hook for consumers
export const useLarkApi = () => useContext(LarkApiContext);
