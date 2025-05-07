import fs from "node:fs";
import path from "node:path";
import {
  fetchAllDocumentBlocks,
  getDocumentRevision,
  type Block,
} from "@aokiapp/reark-lark-api";

/**
 * Persistent cache for Lark Doc blocks, keyed by documentId:revisionId.
 */
/**
 * Ensure the cache directory exists.
 */
function ensureCacheDir(cacheDir: string) {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
}

/**
 * Get the cache file path for a document/revision.
 */
function getCacheFilePath(
  documentId: string,
  revisionId: number,
  cacheDir: string,
) {
  // Sanitize documentId for filesystem safety
  const safeDocId = documentId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(cacheDir, `${safeDocId}_${revisionId}.json`);
}

/**
 * Load block cache from the given cacheDir.
 */
function loadBlockCache(
  documentId: string,
  revisionId: number,
  cacheDir: string,
): Block[] | undefined {
  ensureCacheDir(cacheDir);
  const filePath = getCacheFilePath(documentId, revisionId, cacheDir);
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw) as Block[];
    } catch (e) {
      // ignore and treat as cache miss
    }
  }
  return undefined;
}

/**
 * Save block cache to the given cacheDir.
 */
function saveBlockCache(
  documentId: string,
  revisionId: number,
  blocks: Block[],
  cacheDir: string,
) {
  ensureCacheDir(cacheDir);
  const filePath = getCacheFilePath(documentId, revisionId, cacheDir);
  // Atomic write: write to temp file then rename
  const tmpPath = filePath + ".tmp";
  fs.writeFileSync(tmpPath, JSON.stringify(blocks, null, 2), "utf-8");
  fs.renameSync(tmpPath, filePath);
}

/**
 * Orchestrate: get revision, check cache, fetch blocks if needed, update cache.
 * Each document/revision is saved as a separate file in the specified cacheDir.
 */
export async function getBlocksWithCache(
  documentId: string,
  cacheDir: string,
): Promise<Block[]> {
  const revisionId = await getDocumentRevision(documentId);
  const cached = loadBlockCache(documentId, revisionId, cacheDir);
  if (cached) {
    return cached;
  }
  const blocks = await fetchAllDocumentBlocks(documentId);
  saveBlockCache(documentId, revisionId, blocks, cacheDir);
  return blocks;
}
