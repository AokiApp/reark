import { useContext } from "react";
import {
  LarkApiContext,
  LarkApiContextValue,
} from "../contexts/LarkApiContext";
import { BlockStoreProvider } from "../contexts/BlockStoreContext";
import { BlockComponent } from "./BlockComponent";

function LarkRendererInner() {
  const { blocks } = useContext(LarkApiContext);

  if (!blocks || blocks.length === 0) return null;

  const rootBlock =
    blocks.find((block) => block.block_type === 1 && !block.parent_id) ||
    blocks[0];

  if (!rootBlock) return null;

  return (
    <BlockStoreProvider items={blocks}>
      <BlockComponent blockId={rootBlock.block_id} />
    </BlockStoreProvider>
  );
}

type Props = {
  initialData: LarkApiContextValue;
};

export function LarkRenderer({ initialData }: Props) {
  return (
    <LarkApiContext.Provider value={initialData}>
      <LarkRendererInner />
    </LarkApiContext.Provider>
  );
}
