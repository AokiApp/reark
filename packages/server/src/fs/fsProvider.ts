import { FailingFSProvider } from "./failingFSProvider";

/**
 * FSProvider interface for abstracting file system operations.
 */
export abstract class FSProvider {
  abstract get(key: string): Promise<Buffer | string | undefined>;
  abstract put(key: string, value: Buffer | string): Promise<void>;
  abstract list(): Promise<string[]>;
  abstract remove(key: string): Promise<void>;
  abstract getPublicUrl(key: string): Promise<string | undefined>;
}

/**
 * Global fsProvider variable, can be swapped at runtime.
 */
let fsProvider: FSProvider = new FailingFSProvider();

/**
 * Set the global fsProvider.
 */
export function setFSProvider(provider: FSProvider) {
  fsProvider = provider;
}

/**
 * Get the current global fsProvider.
 */
export { fsProvider };
