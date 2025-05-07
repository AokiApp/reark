# Reark Server Refactoring Instructions

## 概要 / Overview

このドキュメントは `packages/server/src/index.ts` の大規模リファクタリング指示・設計・実装方針をまとめたものです。他の開発者が同様のリファクタリングを再現できるよう、要件・設計・手順・実装例を明記しています。

---

## 1. 要件 / Requirements

- **ファイル分割**: 既存の巨大な `index.ts` を責務ごとに複数ファイルへ分割し、保守性・可読性を向上させる。
- **FS抽象化**: ローカルディスクだけでなく、Cloudflare R2, AzureFiles, Samba, FTP, Google Drive API など非POSIXなストレージも将来的に扱えるような、シンプルかつ拡張性の高いファイルシステム抽象化層を導入する。
  - インターフェースはPOSIX的でなく、`get/put/list/remove/getPublicUrl` のようなミニマルAPIとする。
  - S3のような「公開URL取得」機能（`getPublicUrl`）を必須とする。
  - ローカルディスクアダプタにおいて、Next.jsの`public/lark-files`ディレクトリにマッピングし、`getPublicUrl`は`/lark-files/filename.ext`のようなURLを返す。
- **その他リファクタ**: キャッシュ管理、Lark APIオーケストレーション、ファイルダウンロード等も責務分離し、モダンな設計・型安全・エラーハンドリングを徹底する。

---

## 2. 新ファイル構成 / New File Structure

```
packages/server/src/
├── cache/
│   └── blockCache.ts         # ブロックキャッシュ管理
├── fs/
│   └── fsProvider.ts         # FS抽象化シングルトン実装
├── lark/
│   ├── fileManager.ts        # ファイルトークン抽出・ダウンロード管理
│   └── ssr.ts                # Lark APIオーケストレーション
└── index.ts                  # 公開APIエントリポイント
```

---

## 3. 主要インターフェース / Key Interfaces

### FSProvider

```ts
export interface FSProvider {
  get(key: string): Promise<Buffer | string | undefined>;
  put(key: string, value: Buffer | string): Promise<void>;
  list(prefix: string): Promise<string[]>;
  remove(key: string): Promise<void>;
  getPublicUrl(key: string): Promise<string | undefined>;
}
export const fsProvider: FSProvider; // シングルトン
```

- `key` は論理パス（例: `"cache/doc_123.json"`）。ローカル実装ではルートディレクトリ配下にマッピング。
- `getPublicUrl` は静的公開URL（例: `/lark-files/filename.ext`）を返す。

---

## 4. 実装・分割方針 / Implementation & Modularization

### 4.1 FS抽象化 (`fs/fsProvider.ts`)

- Node.jsの`fs/promises`を用いたローカル実装。
- 将来的なクラウドストレージ実装も同一インターフェースで差し替え可能。

### 4.2 キャッシュ管理 (`cache/blockCache.ts`)

- ドキュメントID＋リビジョンIDごとにキャッシュファイルを管理。
- すべてのファイル操作は`fsProvider`経由。

### 4.3 Lark APIオーケストレーション (`lark/ssr.ts`)

- SSR用データ取得の高レベルフローのみ記述。
- ファイルトークン抽出・ダウンロード等は`fileManager.ts`へ委譲。

### 4.4 ファイル管理 (`lark/fileManager.ts`)

- ブロック配列からファイルトークン抽出。
- 既存ファイルの検出・新規ダウンロード・公開URLマッピングを一元管理。

### 4.5 エントリポイント (`index.ts`)

- 公開APIのみ再エクスポート。

---

## 5. 参考実装例 / Example Implementation

### `fs/fsProvider.ts` 抜粋

```ts
export interface FSProvider {
  get(key: string): Promise<Buffer | string | undefined>;
  put(key: string, value: Buffer | string): Promise<void>;
  list(prefix: string): Promise<string[]>;
  remove(key: string): Promise<void>;
  getPublicUrl(key: string): Promise<string | undefined>;
}
export const fsProvider: FSProvider = new LocalDiskFSProvider(...);
```

### `cache/blockCache.ts` 抜粋

```ts
export async function loadBlockCache(documentId: string, revisionId: number): Promise<Block[] | undefined> { ... }
export async function saveBlockCache(documentId: string, revisionId: number, blocks: Block[]): Promise<void> { ... }
```

### `lark/fileManager.ts` 抜粋

```ts
export function extractFileTokens(blocks: Block[]): string[] { ... }
export async function getExistingTokenToFilename(publicPrefix: string): Promise<Record<string, string>> { ... }
export async function downloadAndStoreFiles(tokens: string[], s3Urls: Record<string, string>, publicPrefix: string): Promise<Record<string, string>> { ... }
```

### `lark/ssr.ts` 抜粋

```ts
export async function getLarkInitialDataForSSR(
  documentId: string,
  publicPrefix = "files/",
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

---

## 6. 注意事項 / Notes

- すべてのファイル操作は`fsProvider`経由で行うこと。直接`fs`や`path`を使わない。
- 新たなストレージ実装を追加する場合は`FSProvider`インターフェースを実装し、`fsProvider`を差し替えるだけでよい。
- 公開URLの生成ロジックはストレージ種別ごとに適切に実装すること。
- 型安全・エラーハンドリング・責務分離を徹底すること。
- 旧実装における非合理な部分はリファクタリングの際に改善すること。

---

## 7. 依頼・再現手順 / How to Delegate or Reproduce

1. 本ドキュメントの要件・設計・分割方針を理解する。
2. 既存の`index.ts`を分析し、各責務ごとに新ファイルへロジックを移植・整理する。
3. すべてのファイル操作を`fsProvider`経由に書き換える。
4. 公開APIは`index.ts`で再エクスポートする。
5. 必要に応じてテスト・型定義・エラーハンドリングを強化する。

---

以上。  
本指示書に従えば、同様のリファクタリングを他の開発者が再現可能です。
