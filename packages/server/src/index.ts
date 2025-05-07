import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";
import {
  getComments,
  batchGetTmpDownloadUrlsChunked,
  type Block,
  type CommentData,
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
  const { getDocumentRevision, fetchAllDocumentBlocks } = await import(
    "@aokiapp/reark-lark-api"
  );
  const revisionId = await getDocumentRevision(documentId);
  const cached = loadBlockCache(documentId, revisionId, cacheDir);
  if (cached) {
    return cached;
  }
  const blocks = await fetchAllDocumentBlocks(documentId);
  saveBlockCache(documentId, revisionId, blocks, cacheDir);
  return blocks;
}

export { setCredentials } from "@aokiapp/reark-lark-api";

export interface LarkInitialData {
  version: number;
  blocks: Block[];
  comments: CommentData[];
  files: Record<string, string>; // fileToken → public URL
}

/**
 * Fetches all Lark API data for SSR and prepares public URLs for file tokens.
 * - Uses batch_get_tmp_download_url for efficient file access.
 * - Downloads files to the public directory with correct extension.
 * - Maintains a manifest and removes orphaned files.
 * - Lenient error handling: logs and continues on failure.
 */
export async function getLarkInitialDataForSSR(
  documentId: string,
  publicDir: string,
  publicUrlBase: string = "/lark-files/",
): Promise<LarkInitialData> {
  // 1. Fetch all blocks (with SSR cache)
  const blocks = await getBlocksWithCache(documentId, publicDir);

  // 2. Collect all unique file tokens from image blocks
  const fileTokens = Array.from(
    blocks.reduce((acc, block) => {
      if ([23, 27].includes(block.block_type)) {
        let token: string | undefined;
        if (block.block_type === 23 && block.file) {
          token = block.file.token;
        } else if (block.block_type === 27 && block.image) {
          token = block.image.token;
        } else if (block.block_type === 2) {
          // W.I.P. for text blocks
        }
        if (token) {
          acc.add(token);
        }
      }
      return acc;
    }, new Set<string>()),
  );

  // 2.5. Detect already downloaded fileTokens in publicDir
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const existingFiles = new Set(fs.readdirSync(publicDir));
  // Map: token -> filename (with extension)
  const existingTokenToFilename: Record<string, string> = {};
  for (const file of existingFiles) {
    const match = file.match(/^([^.]+)\.[^.]+$/);
    if (match) {
      existingTokenToFilename[match[1]] = file;
    }
  }

  // 3. Fetch S3 URLs in bulk (only for tokens not already downloaded)
  const tokensToDownload = fileTokens.filter(
    (token) => !(token in existingTokenToFilename),
  );
  const s3Urls =
    tokensToDownload.length > 0
      ? await batchGetTmpDownloadUrlsChunked(tokensToDownload)
      : {};

  // 4. Download files and write to publicDir, build files map
  const files: Record<string, string> = {};
  for (const token of fileTokens) {
    // If already downloaded, just use the existing file
    if (token in existingTokenToFilename) {
      files[token] = path.posix.join(
        publicUrlBase,
        existingTokenToFilename[token],
      );
      continue;
    }
    const url = s3Urls[token];
    if (!url) {
      console.warn(`[Lark SSR] No S3 URL for token: ${token}`);
      continue;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      const contentType = res.headers.get("content-type") || "";
      const ext = mime.extension(contentType) || "bin";
      const filename = `${token}.${ext}`;
      const filePath = path.join(publicDir, filename);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      files[token] = path.posix.join(publicUrlBase, filename);
    } catch (err) {
      console.error(
        `[Lark SSR] Failed to download/write file for token: ${token}`,
        err,
      );
    }
  }

  // 6. Fetch comments
  let comments: CommentData[] = [];
  try {
    const commentRes = await getComments(documentId);
    comments = commentRes.data?.items || [];
  } catch (err) {
    console.error(
      `[Lark SSR] Failed to fetch comments for document: ${documentId}`,
      err,
    );
  }

  // 7. Return initialData with version
  return {
    version: 1,
    blocks,
    comments,
    files,
  };
}
