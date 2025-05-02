import { Block } from "./types/block";
import { CommentListResponse, DocumentBlockResponse } from "./types/api";

const TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

// APIのベースURLを環境に応じて取得する関数
function getApiBaseUrl(): string {
  return "https://open.larksuite.com/open-apis";
}

// urlが絶対パスでなければbaseUrlを付与
function resolveUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return getApiBaseUrl() + (url.startsWith("/") ? url : "/" + url);
}

// Base fetch handler (mostly for JSON responses)
async function handleFetch(url: string, options: RequestInit) {
  const fullUrl = resolveUrl(url);
  const response = await fetch(fullUrl, options);
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
      console.error(
        `Error fetching ${fullUrl}: ${JSON.stringify(errorData, null, 2)}`,
      );
    } catch (e) {
      // Handle cases where the error response is not JSON
      console.error(
        `HTTP error fetching ${fullUrl}! status: ${response.status}, Response not JSON.`,
      );
    }
    throw new Error(
      `HTTP error! status: ${response.status} fetching ${fullUrl}`,
    );
  }
  // Handle cases where response might be empty (e.g., 204 No Content)
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null; // Or return {}; depending on expected behavior
  }
  return response.json();
}

// Helper for authenticated Lark API requests
async function larkApiRequest<T>(
  urlPath: string,
  options: Omit<RequestInit, "headers"> & { headers?: Record<string, string> },
  responseType: "json" | "blob" = "json",
): Promise<T> {
  const accessToken = await getValidAccessToken();
  const fullUrl = resolveUrl(urlPath);

  // Construct headers object conditionally
  const headers: HeadersInit = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };
  // Add Content-Type only if body exists and it's not already set
  if (options.body && !options.headers?.["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers: headers, // Use the constructed headers object
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
      console.error(
        `Error fetching ${urlPath}: ${JSON.stringify(errorData, null, 2)}`,
      );
    } catch (e) {
      console.error(
        `Error fetching ${urlPath}: Status ${response.status}, Response not JSON.`,
      );
    }
    throw new Error(
      `HTTP error! status: ${response.status} fetching ${urlPath}`,
    );
  }

  if (responseType === "blob") {
    // Ensure the return type matches the generic T, casting might be needed depending on usage
    return response.blob() as Promise<T>;
  }

  // Handle empty JSON response
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    // Ensure the return type matches the generic T
    return null as T; // Or {} as T, adjust as needed based on expected API behavior
  }

  // Ensure the return type matches the generic T
  return response.json() as Promise<T>;
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
): Promise<DocumentBlockResponse> {
  const url = `/docx/v1/documents/${documentId}/blocks?document_revision_id=-1&page_size=500&page_token=${pageToken}`;
  // Use the new helper function
  return await larkApiRequest<DocumentBlockResponse>(url, {
    method: "GET",
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

  const response = await handleFetch(resolveUrl(url), {
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
  const url = `/drive/v1/medias/${fileToken}/download`;
  // Use the new helper function, specifying 'blob' response type
  return await larkApiRequest<Blob>(
    url,
    {
      method: "GET",
    },
    "blob",
  );
}

export async function getComments(fileToken: string) {
  const url = `/drive/v1/files/${fileToken}/comments/?file_type=docx`;
  // Use the new helper function
  // Assuming the response structure is similar to ApiResponse or define a specific type
  return await larkApiRequest<CommentListResponse>(url, {
    // Adjust ApiResponse if needed
    method: "GET",
  });
}
/**
 * Fetch temporary download URLs for multiple file tokens using Lark's batch API.
 * @param fileTokens Array of file tokens to fetch.
 * @returns Mapping of fileToken to temporary download URL.
 */
export async function batchGetTmpDownloadUrls(
  fileTokens: string[],
): Promise<Record<string, string>> {
  if (!fileTokens.length) return {};
  const url =
    "/drive/v1/medias/batch_get_tmp_download_url?file_tokens=" +
    fileTokens.join("&file_tokens=");
  // Define a more specific type for the expected response structure
  type BatchUrlResponse = {
    code: number;
    msg: string;
    data?: {
      tmp_download_urls?: Array<{
        file_token: string;
        tmp_download_url: string;
      }>;
    };
  };
  // Use the new helper function
  const json = await larkApiRequest<BatchUrlResponse>(url, {
    method: "GET",
    // Content-Type is automatically handled by larkApiRequest when body is present
  });
  const urls: Record<string, string> = {};
  // Safely access nested properties
  for (const entry of json?.data?.tmp_download_urls || []) {
    if (entry.file_token && entry.tmp_download_url) {
      urls[entry.file_token] = entry.tmp_download_url;
    }
  }
  return urls;
}
