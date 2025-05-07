import { FsProvider } from "./fsProvider";

/**
 * MemoryFsProvider: all operations are performed in memory.
 */
export class MemoryFsProvider extends FsProvider {
  private files = new Map<string, Buffer>();

  constructor() {
    super();
  }

  private makeCompositeKey(ns: string, key: string): string {
    return `${ns}/${key}`;
  }

  async get(ns: string, key: string): Promise<Buffer | undefined> {
    return this.files.get(this.makeCompositeKey(ns, key));
  }

  async put(ns: string, key: string, value: Buffer): Promise<void> {
    this.files.set(this.makeCompositeKey(ns, key), value);
  }

  async list(ns: string): Promise<string[]> {
    const prefix = `${ns}/`;
    const keys: string[] = [];
    for (const k of this.files.keys()) {
      if (k.startsWith(prefix)) {
        keys.push(k.slice(prefix.length));
      }
    }
    return keys;
  }

  async remove(ns: string, key: string): Promise<void> {
    this.files.delete(this.makeCompositeKey(ns, key));
  }

  async getPublicUrl(ns: string, key: string): Promise<string | undefined> {
    const compositeKey = this.makeCompositeKey(ns, key);
    if (this.files.has(compositeKey)) {
      return `/lark-files/${ns}/${key}`;
    }
    return undefined;
  }
}
