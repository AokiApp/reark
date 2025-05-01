import { useEffect, useState } from "react";
import { BlockComponent } from "./BlockComponent";
import { BlockStoreProvider } from "../contexts/BlockStoreContext";
import { Block } from "../types/block";
import { fetchAllDocumentBlocks } from "../apis";

interface ConverterProps {
  documentId: string;
}

export const Converter: React.FC<ConverterProps> = ({ documentId }) => {
  const [items, setItems] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!documentId) {
        setItems([]);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        const allItems = await fetchAllDocumentBlocks(documentId);
        setItems(allItems);
        setError(null);
      } catch (error) {
        setItems([]);
        setError(
          error instanceof Error ? error.message : "Failed to fetch document",
        );
        console.error("Document fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [documentId]);

  if (isLoading) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#666",
        }}
      >
        Loading document...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          color: "#dc3545",
          border: "1px solid #dc3545",
          borderRadius: "4px",
          backgroundColor: "#fff",
        }}
      >
        {error}
      </div>
    );
  }

  // Find the root block (Page block with no parent, or fallback to first block)
  const rootBlock =
    items.find((block) => block.block_type === 1 && !block.parent_id) ||
    items[0];

  if (!rootBlock) return null;

  return (
    <BlockStoreProvider items={items}>
      <BlockComponent blockId={rootBlock.block_id} />
    </BlockStoreProvider>
  );
};
