/* eslint-disable @typescript-eslint/no-unused-vars */
import { FSProvider } from "./fsProvider";

/**
 * FailingFSProvider: all methods throw errors.
 */
export class FailingFSProvider extends FSProvider {
  private static error(): never {
    throw new Error("FSProvider: No provider is set.");
  }

  async get(_key: string): Promise<Buffer | string | undefined> {
    FailingFSProvider.error();
  }
  async put(_key: string, _value: Buffer | string): Promise<void> {
    FailingFSProvider.error();
  }
  async list(): Promise<string[]> {
    FailingFSProvider.error();
  }
  async remove(_key: string): Promise<void> {
    FailingFSProvider.error();
  }
  async getPublicUrl(_key: string): Promise<string | undefined> {
    FailingFSProvider.error();
  }
}
