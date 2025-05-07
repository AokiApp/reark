import { fsProvider } from "../fs/fsProvider";
import type { Block } from "@aokiapp/reark-lark-api";

/**
 * Get the cache file key for a document/revision.
 */
function getCacheFileKey(documentId: string, revisionId: number): string {
  // Sanitize documentId for filesystem safety
  const safeDocId = documentId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `${safeDocId}_${revisionId}.json`;
}

/**
 * Load block cache using fsProvider.
 */
export async function loadBlockCache(
  documentId: string,
  revisionId: number,
): Promise<Block[] | undefined> {
  const key = getCacheFileKey(documentId, revisionId);
  try {
    const raw = await fsProvider.get("block", key);
    if (raw && Buffer.isBuffer(raw)) {
      const json = raw.toString("utf-8");
      return JSON.parse(json) as Block[];
    }
  } catch {
    // ignore and treat as cache miss
  }
  return undefined;
}

/**
 * Save block cache using fsProvider.
 */
export async function saveBlockCache(
  documentId: string,
  revisionId: number,
  blocks: Block[],
): Promise<void> {
  const key = getCacheFileKey(documentId, revisionId);
  const buf = Buffer.from(JSON.stringify(blocks, null, 2), "utf-8");
  await fsProvider.put("block", key, buf);
}
