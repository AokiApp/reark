import React, { createContext, useContext } from "react";
import { Block } from "../types/block";

interface BlockStore {
  blocks: Record<string, Block>;
  rootId: string;
}

const BlockStoreContext = createContext<BlockStore | null>(null);

// 大した処理をしていないのでeslintを無効化
// eslint-disable-next-line react-refresh/only-export-components
export const useBlockStore = () => {
  const context = useContext(BlockStoreContext);
  if (!context) {
    throw new Error("useBlockStore must be used within a BlockStoreProvider");
  }
  return context;
};

interface BlockStoreProviderProps {
  items: Block[];
  children: React.ReactNode;
}

export const BlockStoreProvider: React.FC<BlockStoreProviderProps> = ({
  items,
  children,
}) => {
  // Convert array to map for O(1) lookups
  const blocks = items.reduce<Record<string, Block>>((acc, block) => {
    acc[block.block_id] = block;
    return acc;
  }, {});

  // Find root block (block with no parent)
  const rootId =
    items.find((block) => !block.parent_id)?.block_id || items[0]?.block_id;

  return (
    <BlockStoreContext.Provider value={{ blocks, rootId }}>
      {children}
    </BlockStoreContext.Provider>
  );
};
