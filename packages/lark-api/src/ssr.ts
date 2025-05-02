import fs from "fs";
import path from "node:path";
import mime from "mime-types";
import {
  fetchAllDocumentBlocks,
  getComments,
  batchGetTmpDownloadUrls,
} from "./apis";
import type { Block } from "./types/block";
import type { CommentData } from "./types/api";

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
    new Set(
      blocks
        .map((block) => block.image?.token)
        .filter((token): token is string => !!token),
    ),
  );

  // 3. Fetch S3 URLs in bulk
  const s3Urls = await batchGetTmpDownloadUrls(fileTokens);

  // 4. Download files and write to publicDir, build files map
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const files: Record<string, string> = {};
  for (const token of fileTokens) {
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

  // 5. Cleanup orphaned files
  const manifestSet = new Set(
    Object.values(files).map((url) => path.basename(url)),
  );
  for (const file of fs.readdirSync(publicDir)) {
    if (!manifestSet.has(file)) {
      try {
        fs.unlinkSync(path.join(publicDir, file));
      } catch (err) {
        console.error(
          `[Lark SSR] Failed to remove orphaned file: ${file}`,
          err,
        );
      }
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
