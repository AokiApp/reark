import fs from "node:fs/promises";
import path from "node:path";
import { FsProvider } from "./fsProvider";

/**
 * LocalDiskFsProvider implements FsProvider using the local file system.
 * All files are stored under the Next.js public/lark-files directory.
 */
export class LocalDiskFsProvider extends FsProvider {
  private rootDir: string;

  constructor(rootDir: string) {
    super();
    this.rootDir = rootDir;
  }

  private resolvePath(ns: string, key: string): string {
    // Sanitize ns and key to prevent directory traversal
    const safeNs = ns.replace(/[^a-zA-Z0-9/_\-.]/g, "_");
    const safeKey = key.replace(/[^a-zA-Z0-9/_\-.]/g, "_");
    return path.join(this.rootDir, safeNs, safeKey);
  }

  async get(ns: string, key: string): Promise<Buffer | undefined> {
    const filePath = this.resolvePath(ns, key);
    try {
      return await fs.readFile(filePath);
    } catch {
      return undefined;
    }
  }

  async put(ns: string, key: string, value: Buffer): Promise<void> {
    const filePath = this.resolvePath(ns, key);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, value);
  }

  async list(ns: string): Promise<string[]> {
    const dir = path.join(this.rootDir, ns.replace(/[^a-zA-Z0-9/_\-.]/g, "_"));
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
    return walk(dir, "");
  }

  async remove(ns: string, key: string): Promise<void> {
    const filePath = this.resolvePath(ns, key);
    try {
      await fs.unlink(filePath);
    } catch {
      // ignore if not exists
    }
  }

  async getPublicUrl(ns: string, key: string): Promise<string | undefined> {
    const filePath = this.resolvePath(ns, key);
    try {
      await fs.access(filePath);
      const filename = path.basename(filePath);
      return `/lark-files/${ns}/${filename}`;
    } catch {
      return undefined;
    }
  }
}
