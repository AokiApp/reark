import fs from "node:fs/promises";
import path from "node:path";
import { FSProvider } from "./fsProvider";

/**
 * LocalDiskFSProvider implements FSProvider using the local file system.
 * All files are stored under the Next.js public/lark-files directory.
 */
export class LocalDiskFSProvider extends FSProvider {
  private rootDir: string;

  constructor(rootDir: string) {
    super();
    this.rootDir = rootDir;
  }

  private resolvePath(key: string): string {
    // Sanitize key to prevent directory traversal
    const safeKey = key.replace(/[^a-zA-Z0-9/_\-.]/g, "_");
    return path.join(this.rootDir, safeKey);
  }

  async get(key: string): Promise<Buffer | string | undefined> {
    const filePath = this.resolvePath(key);
    try {
      return await fs.readFile(filePath);
    } catch {
      return undefined;
    }
  }

  async put(key: string, value: Buffer | string): Promise<void> {
    const filePath = this.resolvePath(key);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, value);
  }

  async list(): Promise<string[]> {
    const walk = async (dir: string, prefix: string): Promise<string[]> => {
      let results: string[] = [];
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relPath = prefix
            ? path.posix.join(prefix, entry.name)
            : entry.name;
          if (entry.isDirectory()) {
            results = results.concat(await walk(fullPath, relPath));
          } else {
            results.push(relPath);
          }
        }
      } catch {
        // ignore errors, return what we have
      }
      return results;
    };
    return walk(this.rootDir, "");
  }

  async remove(key: string): Promise<void> {
    const filePath = this.resolvePath(key);
    try {
      await fs.unlink(filePath);
    } catch {
      // ignore if not exists
    }
  }
  async getPublicUrl(key: string): Promise<string | undefined> {
    const filePath = this.resolvePath(key);
    try {
      await fs.access(filePath);
      const filename = path.basename(filePath);
      return `/lark-files/${filename}`;
    } catch {
      return undefined;
    }
  }
}
