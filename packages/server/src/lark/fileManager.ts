import { fsProvider } from "../fs/fsProvider";
import type { Block } from "@aokiapp/reark-lark-api";
import mime from "mime-types";

/**
 * Extract file tokens from blocks (file and image blocks).
 */
export function extractFileTokens(blocks: Block[]): string[] {
  const tokens = new Set<string>();
  for (const block of blocks) {
    if ([23, 27].includes(block.block_type)) {
      let token: string | undefined;
      if (block.block_type === 23 && block.file) {
        token = block.file.token;
      } else if (block.block_type === 27 && block.image) {
        token = block.image.token;
      }
      if (token) {
        tokens.add(token);
      }
    }
  }
  return Array.from(tokens);
}

/**
 * Get a mapping from file token to filename for already existing files in the public directory.
 */
export async function getExistingTokenToFilename(
  publicPrefix: string,
): Promise<Record<string, string>> {
  const files = await fsProvider.list(publicPrefix);
  const tokenToFilename: Record<string, string> = {};
  for (const file of files) {
    const filename = file.split("/").pop() || "";
    const match = filename.match(/^([^.]+)\.[^.]+$/);
    if (match) {
      tokenToFilename[match[1]] = filename;
    }
  }
  return tokenToFilename;
}

/**
 * Download and store files for the given tokens using provided S3 URLs.
 * Returns a mapping from token to public URL.
 */
export async function downloadAndStoreFiles(
  tokens: string[],
  s3Urls: Record<string, string>,
  publicPrefix: string,
): Promise<Record<string, string>> {
  const tokenToUrl: Record<string, string> = {};
  for (const token of tokens) {
    const url = s3Urls[token];
    if (!url) {
      // No URL for this token
      continue;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const contentType = res.headers.get("content-type") || "";
      const ext = mime.extension(contentType) || "bin";
      const filename = `${token}.${ext}`;
      const key = `${publicPrefix}${filename}`;
      await fsProvider.put(key, buffer);
      const publicUrl = await fsProvider.getPublicUrl(key);
      if (publicUrl) {
        tokenToUrl[token] = publicUrl;
      }
    } catch (err) {
      // Log and continue on error
      console.error(
        `[fileManager] Failed to download/store file for token: ${token}`,
        err,
      );
    }
  }
  return tokenToUrl;
}
