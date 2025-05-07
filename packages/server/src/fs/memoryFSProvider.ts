import { FSProvider } from "./fsProvider";

/**
 * MemoryFSProvider: all operations are performed in memory.
 */
export class MemoryFSProvider extends FSProvider {
  private files = new Map<string, Buffer>();

  constructor() {
    super();
  }

  async get(key: string): Promise<Buffer | string | undefined> {
    return this.files.get(key);
  }

  async put(key: string, value: Buffer | string): Promise<void> {
    this.files.set(key, Buffer.isBuffer(value) ? value : Buffer.from(value));
  }

  async list(): Promise<string[]> {
    return Array.from(this.files.keys());
  }

  async remove(key: string): Promise<void> {
    this.files.delete(key);
  }
  async getPublicUrl(key: string): Promise<string | undefined> {
    if (this.files.has(key)) {
      const filename = key.split("/").pop() || key;
      return `/lark-files/${filename}`;
    }
    return undefined;
  }
}
