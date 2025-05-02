//共有されたリンク(URL)から、document_idを抽出する。
export function extractDocId(url: string): string {
  const match = url.match(
    /^https:\/\/[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+\.)?(larksuite\.com|feishu\.cn)\/docx\/([a-zA-Z0-9]+)(\?.*)?$/,
  );
  if (!match) {
    throw new Error("Malformed URL");
  }
  return match[3];
}

//文字列からURLを検出する
export function containsUrl(text: string): boolean {
  const urlPattern = /\bhttps?:\/\/[^\s]+/g;
  // 正規表現がマッチするかをチェック
  return urlPattern.test(text);
}
