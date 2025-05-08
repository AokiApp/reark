import { FsProvider } from "./fsProvider";
import type { S3Client, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

/**
 * CloudflareR2FsProvider implements FsProvider using Cloudflare R2 (S3-compatible).
 * Requires @aws-sdk/client-s3 as a peerDependency or optionalDependency.
 */
export class CloudflareR2FsProvider extends FsProvider {
  private s3: S3Client | null;
  private bucket: string;
  private publicUrlBase?: string;

  /**
   * @param options.bucket - R2 bucket name
   * @param options.accessKeyId - R2 access key ID
   * @param options.secretAccessKey - R2 secret access key
   * @param options.endpoint - R2 endpoint URL (e.g. https://<accountid>.r2.cloudflarestorage.com)
   * @param options.region - AWS region (e.g. auto, us-east-1)
   * @param options.publicUrlBase - (optional) base URL for public access
   */
  constructor(options: {
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
    endpoint: string;
    region?: string;
    publicUrlBase?: string;
  }) {
    super();
    this.bucket = options.bucket;
    this.publicUrlBase = options.publicUrlBase;
    this.s3 = null;
    this.initS3(options);
  }

  private async initS3(options: {
    accessKeyId: string;
    secretAccessKey: string;
    endpoint: string;
    region?: string;
  }) {
    const mod = await import("@aws-sdk/client-s3");
    this.s3 = new mod.S3Client({
      region: options.region || "auto",
      endpoint: options.endpoint,
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  private async getS3(): Promise<S3Client> {
    if (!this.s3) {
      throw new Error("S3 client not initialized yet.");
    }
    return this.s3;
  }

  private makeKey(ns: string, key: string): string {
    const safeNs = ns.replace(/[^a-zA-Z0-9/_\-.]/g, "_");
    const safeKey = key.replace(/[^a-zA-Z0-9/_\-.]/g, "_");
    return `${safeNs}/${safeKey}`;
  }

  async get(ns: string, key: string): Promise<Buffer | undefined> {
    const s3 = await this.getS3();
    const { GetObjectCommand } = await import("@aws-sdk/client-s3");
    try {
      const res = await s3.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: this.makeKey(ns, key),
        }),
      );
      const body = res.Body;
      if (!body) return undefined;
      const chunks: Buffer[] = [];
      for await (const chunk of body as AsyncIterable<
        Uint8Array | Buffer | string
      >) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    } catch (e: unknown) {
      if (
        typeof e === "object" &&
        e !== null &&
        (("name" in e && (e as { name: string }).name === "NoSuchKey") ||
          ("$metadata" in e &&
            (e as { $metadata?: { httpStatusCode?: number } }).$metadata
              ?.httpStatusCode === 404))
      ) {
        return undefined;
      }
      throw e;
    }
  }

  async put(ns: string, key: string, value: Buffer): Promise<void> {
    const s3 = await this.getS3();
    const { PutObjectCommand } = await import("@aws-sdk/client-s3");
    await s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: this.makeKey(ns, key),
        Body: value,
      }),
    );
  }

  async list(ns: string): Promise<string[]> {
    const s3 = await this.getS3();
    const { ListObjectsV2Command } = await import("@aws-sdk/client-s3");
    const prefix = ns.replace(/[^a-zA-Z0-9/_\-.]/g, "_") + "/";
    let continuationToken: string | undefined = undefined;
    const keys: string[] = [];
    do {
      const res: ListObjectsV2CommandOutput = await s3.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        }),
      );
      if (res.Contents) {
        for (const obj of res.Contents) {
          if (obj.Key && obj.Key.startsWith(prefix)) {
            keys.push(obj.Key.slice(prefix.length));
          }
        }
      }
      continuationToken = res.NextContinuationToken;
    } while (continuationToken);
    return keys;
  }

  async remove(ns: string, key: string): Promise<void> {
    const s3 = await this.getS3();
    const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
    await s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: this.makeKey(ns, key),
      }),
    );
  }

  async getPublicUrl(ns: string, key: string): Promise<string | undefined> {
    if (this.publicUrlBase) {
      return `${this.publicUrlBase.replace(/\/$/, "")}/${this.makeKey(ns, key)}`;
    }
    // Otherwise, signed URL (not implemented here)
    return undefined;
  }
}
