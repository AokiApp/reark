/**
 * FsProvider interface for abstracting file system operations.
 */
export abstract class FsProvider {
  /**
   * Get a file as Buffer from the given namespace and key.
   */
  abstract get(ns: string, key: string): Promise<Buffer | undefined>;
  /**
   * Put a file as Buffer into the given namespace and key.
   */
  abstract put(ns: string, key: string, value: Buffer): Promise<void>;
  /**
   * List all file keys in the given namespace.
   */
  abstract list(ns: string): Promise<string[]>;
  /**
   * Remove a file from the given namespace and key.
   */
  abstract remove(ns: string, key: string): Promise<void>;
  /**
   * Get a public URL for a file in the given namespace and key.
   */
  abstract getPublicUrl(ns: string, key: string): Promise<string | undefined>;
}

/**
 * Global fsProvider variable, can be swapped at runtime.
 */
let fsProvider: FsProvider = null!;

/**
 * Set the global fsProvider.
 */
export function setFsProvider(provider: FsProvider) {
  fsProvider = provider;
}

/**
 * Get the current global fsProvider.
 */
export { fsProvider };
