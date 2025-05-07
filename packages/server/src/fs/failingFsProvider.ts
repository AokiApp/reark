/* eslint-disable @typescript-eslint/no-unused-vars */
import { FsProvider } from "./fsProvider";

/**
 * FailingFsProvider: all methods throw errors.
 */
export class FailingFsProvider extends FsProvider {
  private static error(): never {
    throw new Error("FsProvider: No provider is set.");
  }

  async get(_ns: string, _key: string): Promise<Buffer | undefined> {
    FailingFsProvider.error();
  }
  async put(_ns: string, _key: string, _value: Buffer): Promise<void> {
    FailingFsProvider.error();
  }
  async list(_ns: string): Promise<string[]> {
    FailingFsProvider.error();
  }
  async remove(_ns: string, _key: string): Promise<void> {
    FailingFsProvider.error();
  }
  async getPublicUrl(_ns: string, _key: string): Promise<string | undefined> {
    FailingFsProvider.error();
  }
}
