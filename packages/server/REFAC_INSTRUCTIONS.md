# Reark Server Refactoring Instructions

## 3. 主要インターフェース / Key Interfaces

### FsProvider

```ts
export abstract class FsProvider {
  abstract get(key: string): Promise<Buffer | string | undefined>;
  abstract put(key: string, value: Buffer | string): Promise<void>;
  abstract list(): Promise<string[]>;
  abstract remove(key: string): Promise<void>;
  abstract getPublicUrl(key: string): Promise<string | undefined>;
}
export const fsProvider: FsProvider; // グローバル変数
```

#### FsProvider拡張: 2キー・Buffer専用化 / FsProvider Extension: Two-Key & Buffer-Only

**2025/05 追加リファクタ / Additional Refactor (May 2025):**

FsProviderインターフェースを以下の通り拡張・変更した。

- すべてのメソッドが `ns: string`（ネームスペース）と `key: string`（ファイルキー）の2つの引数を取る。
- ファイル内容は常に `Buffer` 型のみを受け付け、`string` は不可。
- これに伴い、全実装（LocalDiskFsProvider, MemoryFsProvider, FailingFsProvider）と全利用箇所を修正。

**新インターフェース例 / New Interface Example:**

```ts
export abstract class FsProvider {
  abstract get(ns: string, key: string): Promise<Buffer | undefined>;
  abstract put(ns: string, key: string, value: Buffer): Promise<void>;
  abstract list(ns: string): Promise<string[]>;
  abstract remove(ns: string, key: string): Promise<void>;
  abstract getPublicUrl(ns: string, key: string): Promise<string | undefined>;
}
```

- 典型的なネームスペース:
  - `"cache"`: ブロックキャッシュ (`blockCache.ts`)
  - `"files"`: 公開ファイル・ダウンロードファイル (`fileManager.ts`, `ssr.ts`)
- 既存の論理パス（例: `"cache/doc_123.json"`）は、`ns="cache"`, `key="doc_123.json"` のように分割して指定する。
- すべてのファイル操作はBufferのみで行い、保存・読込時に明示的にエンコーディング変換を行うこと。

**移行理由 / Rationale:**

- ストレージの論理分割（キャッシュ・公開ファイル等）を明確化し、クラウドストレージ等への拡張性を高めるため。
- ファイル内容の型をBufferに統一することで、バイナリ・テキストの区別なく安全に扱えるようにするため。

**実装・利用箇所の主な修正点 / Main Implementation & Usage Changes:**

- `blockCache.ts`: `fsProvider.get("cache", key)` など、"cache"ネームスペースで利用。
- `fileManager.ts`, `ssr.ts`: `fsProvider.put("files", key, buffer)` など、"files"ネームスペースで利用。
- すべてのput/getでBuffer型を明示的に使用。

- `key` は論理パス（例: `"cache/doc_123.json"`）。ローカル実装ではルートディレクトリ配下にマッピング。
- `getPublicUrl` は静的公開URL（例: `/lark-files/filename.ext`）を返す。
- listは全ファイル名（論理パス）を返す。prefixによるフィルタやpublicPrefixの概念は存在しない。

---

## 4. 実装・分割方針 / Implementation & Modularization

### 4.1 FS抽象化 (`fs/fsProvider.ts`)

- Node.jsの`fs/promises`を用いたローカル実装。
- 将来的なクラウドストレージ実装も同一抽象クラスで差し替え可能。
- publicUrlBaseやpublicPrefixなどのフィールド・引数は一切持たず、ファイルシステムはフラット構造とする。

### 4.2 キャッシュ管理 (`cache/blockCache.ts`)

- ドキュメントID＋リビジョンIDごとにキャッシュファイルを管理。
- すべてのファイル操作は`fsProvider`経由。

### 4.3 Lark APIオーケストレーション (`lark/ssr.ts`)

- SSR用データ取得の高レベルフローのみ記述。
- ファイルトークン抽出・ダウンロード等は`fileManager.ts`へ委譲。
- ファイル名や公開URLの生成にprefixやpublicPrefixは使わず、ファイル名は`{token}.{ext}`形式で一意に決定する。

### 4.4 ファイル管理 (`lark/fileManager.ts`)

- ブロック配列からファイルトークン抽出。
- 既存ファイルの検出・新規ダウンロード・公開URLマッピングを一元管理。
- 既存ファイル検出や新規ファイル保存時もprefixやpublicPrefixは使わず、全ファイルを対象に処理する。

### 4.5 エントリポイント (`index.ts`)

- 公開APIのみ再エクスポート。

---

## 5. 参考実装例 / Example Implementation

### `fs/fsProvider.ts` 抜粋

```ts
export abstract class FsProvider {
  abstract get(key: string): Promise<Buffer | string | undefined>;
  abstract put(key: string, value: Buffer | string): Promise<void>;
  abstract list(): Promise<string[]>;
  abstract remove(key: string): Promise<void>;
  abstract getPublicUrl(key: string): Promise<string | undefined>;
}
export const fsProvider: FsProvider = new LocalDiskFsProvider(...);
```

### `lark/fileManager.ts` 抜粋

```ts
export async function getExistingTokenToFilename(): Promise<
  Record<string, string>
> {
  const files = await fsProvider.list();
  const tokenToFilename: Record<string, string> = {};
  for (const file of files) {
    const filename = file.split("/").pop() || "";
    const match = filename.match(/^([^.]+)\.[^.]+$/);
    if (match) {
      tokenToFilename[match[1]] = filename;
    }
  }
  return tokenToFilename;
}

export async function downloadAndStoreFiles(
  tokens: string[],
  s3Urls: Record<string, string>,
): Promise<Record<string, string>> {
  const tokenToUrl: Record<string, string> = {};
  for (const token of tokens) {
    const url = s3Urls[token];
    if (!url) continue;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const contentType = res.headers.get("content-type") || "";
      const ext = mime.extension(contentType) || "bin";
      const filename = `${token}.${ext}`;
      const key = filename;
      await fsProvider.put(key, buffer);
      const publicUrl = await fsProvider.getPublicUrl(key);
      if (publicUrl) {
        tokenToUrl[token] = publicUrl;
      }
    } catch (err) {
      // Log and continue on error
      console.error(
        `[fileManager] Failed to download/store file for token: ${token}`,
        err,
      );
    }
  }
  return tokenToUrl;
}
```

### `lark/ssr.ts` 抜粋

```ts
export async function getLarkInitialDataForSSR(
  documentId: string,
): Promise<LarkInitialData> {
  // 1. ブロック取得
  // 2. ファイルトークン抽出
  // 3. 既存ファイルを除外
  // 4. 新規ファイルのS3 URL取得
  // 5. S3 URLからファイルダウンロード
  // 6. コメント取得
  // 7. 結果返却
}
```
