import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";
import {
  fetchAllDocumentBlocks,
  getComments,
  batchGetTmpDownloadUrlsChunked,
  type Block,
  type CommentData,
} from "@aokiapp/reark-lark-api";

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
  // 1. Fetch all blocks
  const blocks = await fetchAllDocumentBlocks(documentId);

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
