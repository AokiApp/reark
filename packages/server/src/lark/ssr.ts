import { loadBlockCache, saveBlockCache } from "../cache/blockCache";
import {
  extractFileTokens,
  getExistingTokenToFilename,
  downloadAndStoreFiles,
} from "./fileManager";
import { fsProvider } from "../fs/fsProvider";
import {
  getComments,
  batchGetTmpDownloadUrlsChunked,
  type Block,
  type CommentData,
} from "@aokiapp/reark-lark-api";

export interface LarkInitialData {
  version: number;
  blocks: Block[];
  comments: CommentData[];
  files: Record<string, string>; // fileToken → public URL
}

/**
 * Get blocks with cache using fsProvider-based cache.
 */
async function getBlocksWithCache(documentId: string): Promise<Block[]> {
  const { getDocumentRevision, fetchAllDocumentBlocks } = await import(
    "@aokiapp/reark-lark-api"
  );
  const revisionId = await getDocumentRevision(documentId);
  const cached = await loadBlockCache(documentId, revisionId);
  if (cached) {
    return cached;
  }
  const blocks = await fetchAllDocumentBlocks(documentId);
  await saveBlockCache(documentId, revisionId, blocks);
  return blocks;
}

/**
 * Fetches all Lark API data for SSR and prepares public URLs for file tokens.
 */
export async function getLarkInitialDataForSSR(
  documentId: string,
  publicPrefix: string = "files/",
): Promise<LarkInitialData> {
  // 1. Get blocks with cache
  const blocks = await getBlocksWithCache(documentId);

  // 2. Extract file tokens
  const fileTokens = extractFileTokens(blocks);

  // 3. Get existing files in public dir
  const existingTokenToFilename =
    await getExistingTokenToFilename(publicPrefix);

  // 4. Filter tokens to download
  const tokensToDownload = fileTokens.filter(
    (token) => !(token in existingTokenToFilename),
  );

  // 5. Get S3 URLs for new tokens
  const s3Urls =
    tokensToDownload.length > 0
      ? await batchGetTmpDownloadUrlsChunked(tokensToDownload)
      : {};

  // 6. Download and store new files, get public URLs
  const downloadedTokenToUrl = await downloadAndStoreFiles(
    tokensToDownload,
    s3Urls,
    publicPrefix,
  );

  // 7. Merge all token to public URL mappings
  const files: Record<string, string> = {};
  for (const token of fileTokens) {
    if (token in existingTokenToFilename) {
      const publicUrl = await fsProvider.getPublicUrl(
        `${publicPrefix}${existingTokenToFilename[token]}`,
      );
      if (publicUrl) files[token] = publicUrl;
    } else if (token in downloadedTokenToUrl) {
      files[token] = downloadedTokenToUrl[token];
    }
  }

  // 8. Fetch comments
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

  // 9. Return result
  return {
    version: 1,
    blocks,
    comments,
    files,
  };
}
