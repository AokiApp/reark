import { Block } from "./types/block";
import { ApiResponse } from "./types/api";

const TOKEN_KEY = "tenant_access_token";
const TOKEN_TIMESTAMP_KEY = "tenant_access_token_timestamp";
const TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

const FILE_CACHE_PREFIX = "file_cache_";
const FILE_CACHE_TIMESTAMP_PREFIX = "file_cache_timestamp_";
const FILE_CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24時間
const FILE_CACHE_MIME_PREFIX = "file_cache_mime_";

// APIのベースURLを環境に応じて取得する関数
export function getApiBaseUrl(): string {
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? "/proxy" : "https://open.larksuite.com/open-apis";
}

async function handleFetch(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    console.error(JSON.stringify(errorData, null, 4));
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function getValidAccessToken(): Promise<string> {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedTimestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);

  if (storedToken && storedTimestamp) {
    const timestamp = parseInt(storedTimestamp, 10);
    const currentTime = Date.now();

    if (currentTime - timestamp < TOKEN_EXPIRATION_TIME) {
      return storedToken;
    }
  }

  return await fetchNewToken();
}

export async function getDocumentBlocks(
  documentId: string,
  pageToken: string = "",
): Promise<any> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/docx/v1/documents/${documentId}/blocks?document_revision_id=-1&page_size=500&page_token=${pageToken}`;
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
    const json = (await getDocumentBlocks(
      documentId,
      pageToken,
    )) as ApiResponse;
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

async function fetchNewToken(): Promise<string> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/auth/v3/tenant_access_token/internal`;

  const response = await handleFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: import.meta.env.VITE_APP_ID,
      app_secret: import.meta.env.VITE_APP_SECRET,
    }),
  });

  const newToken = response.tenant_access_token;

  if (!newToken) {
    throw new Error("Failed to fetch new token");
  }
  localStorage.setItem(TOKEN_KEY, newToken);
  localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());

  return newToken;
}

export async function getFile(fileToken: string): Promise<Blob> {
  // キャッシュをチェック
  const cachedData = localStorage.getItem(FILE_CACHE_PREFIX + fileToken);
  const cachedTimestamp = localStorage.getItem(
    FILE_CACHE_TIMESTAMP_PREFIX + fileToken,
  );
  const cachedMimeType = localStorage.getItem(
    FILE_CACHE_MIME_PREFIX + fileToken,
  );

  if (cachedData && cachedTimestamp && cachedMimeType) {
    const timestamp = parseInt(cachedTimestamp, 10);
    if (Date.now() - timestamp < FILE_CACHE_EXPIRATION) {
      // キャッシュが有効な場合はBase64からBlobに変換して返す
      const byteString = atob(cachedData);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: cachedMimeType });
    }
  }

  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/drive/v1/medias/${fileToken}/download`;
  const accessToken = await getValidAccessToken();

  const response = await fetch(url, {
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

  // Blobをbase64に変換してキャッシュ
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  await new Promise((resolve) => {
    reader.onloadend = () => {
      const base64data = reader.result as string;
      const base64Content = base64data.split(",")[1];
      localStorage.setItem(FILE_CACHE_PREFIX + fileToken, base64Content);
      localStorage.setItem(
        FILE_CACHE_TIMESTAMP_PREFIX + fileToken,
        Date.now().toString(),
      );
      localStorage.setItem(FILE_CACHE_MIME_PREFIX + fileToken, blob.type);
      resolve(null);
    };
  });

  return blob;
}

export async function getCommentContent(fileToken: string) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/drive/v1/files/${fileToken}/comments/?file_type=docx`;
  const accessToken = await getValidAccessToken();

  return await handleFetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
