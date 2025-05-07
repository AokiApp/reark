import fs from "node:fs/promises";
import path from "node:path";

/**
 * FSProvider interface for abstracting file system operations.
 */
export interface FSProvider {
  get(key: string): Promise<Buffer | string | undefined>;
  put(key: string, value: Buffer | string): Promise<void>;
  list(prefix: string): Promise<string[]>;
  remove(key: string): Promise<void>;
  getPublicUrl(key: string): Promise<string | undefined>;
}

/**
 * LocalDiskFSProvider implements FSProvider using the local file system.
 * All files are stored under the Next.js public/lark-files directory.
 */
class LocalDiskFSProvider implements FSProvider {
  private rootDir: string;
  private publicUrlBase: string;

  constructor(rootDir: string, publicUrlBase: string = "/lark-files/") {
    this.rootDir = rootDir;
    this.publicUrlBase = publicUrlBase;
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

  async list(prefix: string): Promise<string[]> {
    const dirPath = this.resolvePath(prefix);
    try {
      const files = await fs.readdir(dirPath);
      return files.map((f) => path.join(prefix, f));
    } catch {
      return [];
    }
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
    // Map to /lark-files/filename.ext
    const filePath = this.resolvePath(key);
    try {
      await fs.access(filePath);
      const filename = path.basename(filePath);
      return path.posix.join(this.publicUrlBase, filename);
    } catch {
      return undefined;
    }
  }
}

// Singleton instance for use throughout the app
// By default, maps to Next.js public/lark-files directory
export const fsProvider: FSProvider = new LocalDiskFSProvider(
  path.resolve(
    process.cwd(),
    "../../examples/next-app-router/public/lark-files",
  ),
  "/lark-files/",
);
