import { Block } from "./types/block";
import { ApiResponse } from "./types/api";

const TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

// APIのベースURLを環境に応じて取得する関数
function getApiBaseUrl(): string {
  let isDevelopment = false;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isDevelopment = (import.meta as any).env.MODE === "development";
  } catch (e) {
    isDevelopment = process.env.NODE_ENV === "development";
  }

  return isDevelopment ? "/proxy" : "https://open.larksuite.com/open-apis";
}

// urlが絶対パスでなければbaseUrlを付与
function resolveUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return getApiBaseUrl() + (url.startsWith("/") ? url : "/" + url);
}

async function handleFetch(url: string, options: RequestInit) {
  const fullUrl = resolveUrl(url);
  const response = await fetch(fullUrl, options);
  if (!response.ok) {
    const errorData = await response.json();
    console.error(JSON.stringify(errorData, null, 4));
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function getValidAccessToken(): Promise<string> {
  if (_accessToken && _accessTokenTimestamp) {
    const currentTime = Date.now();
    if (currentTime - _accessTokenTimestamp < TOKEN_EXPIRATION_TIME) {
      return _accessToken;
    }
  }
  return await fetchNewToken();
}

export async function getDocumentBlocks(
  documentId: string,
  pageToken: string = "",
): Promise<ApiResponse> {
  const url = `/docx/v1/documents/${documentId}/blocks?document_revision_id=-1&page_size=500&page_token=${pageToken}`;
  const accessToken = await getValidAccessToken();

  return await handleFetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function fetchAllDocumentBlocks(
  documentId: string,
): Promise<Block[]> {
  let allItems: Block[] = [];
  let pageToken: string | undefined = "";

  do {
    const json = await getDocumentBlocks(documentId, pageToken);
    const validatedItems = json.data.items.map((item) => ({
      ...item,
      parent_id: item.parent_id || "",
      block_id: item.block_id || "",
      block_type: item.block_type || 1,
    })) as Block[];
    allItems = [...allItems, ...validatedItems];
    pageToken = json.data.page_token;
  } while (pageToken);

  return allItems;
}

let _appId: string | null = null;
let _appSecret: string | null = null;
let _accessToken: string | null = null;
let _accessTokenTimestamp: number | null = null;

export function setCredentials(appId: string, appSecret: string): void {
  _appId = appId;
  _appSecret = appSecret;
}

async function fetchNewToken(): Promise<string> {
  if (!_appId || !_appSecret) {
    throw new Error(
      "App ID and App Secret must be set before fetching a token.",
    );
  }

  const url = `/auth/v3/tenant_access_token/internal`;

  const response = await handleFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: _appId,
      app_secret: _appSecret,
    }),
  });

  const newToken = response.tenant_access_token;

  if (!newToken) {
    throw new Error("Failed to fetch new token");
  }
  _accessToken = newToken;
  _accessTokenTimestamp = Date.now();

  return newToken;
}

export async function getFile(fileToken: string): Promise<Blob> {
  // キャッシュは利用しない
  const url = `/drive/v1/medias/${fileToken}/download`;
  const accessToken = await getValidAccessToken();

  const response = await fetch(resolveUrl(url), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(JSON.stringify(errorData, null, 4));
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  return blob;
}

export async function getCommentContent(fileToken: string) {
  const url = `/drive/v1/files/${fileToken}/comments/?file_type=docx`;
  const accessToken = await getValidAccessToken();

  return await handleFetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
/**
 * Fetch temporary download URLs for multiple file tokens using Lark's batch API.
 * @param fileTokens Array of file tokens to fetch.
 * @param accessToken Lark API access token (must be valid).
 * @returns Mapping of fileToken to temporary download URL.
 */
export async function batchGetTmpDownloadUrls(
  fileTokens: string[],
  accessToken: string,
): Promise<Record<string, string>> {
  if (!fileTokens.length) return {};
  const url = "/drive/v1/medias/batch_get_tmp_download_url";
  const body = {
    file_tokens: fileTokens,
  };
  const response = await fetch(resolveUrl(url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(
      "[Lark batchGetTmpDownloadUrls] API error:",
      response.status,
      errorData,
    );
    throw new Error(
      `Failed to fetch batch download URLs: ${response.status} ${JSON.stringify(
        errorData,
      )}`,
    );
  }
  const json = await response.json();
  // Response: { data: { tmp_download_urls: Array<{ file_token, tmp_download_url }> } }
  const urls: Record<string, string> = {};
  for (const entry of json.data?.tmp_download_urls || []) {
    if (entry.file_token && entry.tmp_download_url) {
      urls[entry.file_token] = entry.tmp_download_url;
    }
  }
  return urls;
}
