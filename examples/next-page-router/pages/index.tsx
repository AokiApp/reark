/* eslint-disable import/no-unresolved */
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { LarkRenderer, type LarkApiContextValue } from "@aokiapp/reark";

import {
  getLarkInitialDataForSSR,
  setFsProvider,
  LocalDiskFsProvider,
  setCredentials,
} from "@aokiapp/reark-server";

import "@aokiapp/reark/style.css";
import { TableOfContents } from "@aokiapp/reark";

// Utility to extract documentId from Lark URL or plain ID
function extractDocId(input: string): string {
  // e.g. https://aoki-app.jp.larksuite.com/docx/Q5Oqd7WljoQL6Nx4bdVjOASbpue?from=from_copylink
  const match = input.match(/docx\/([a-zA-Z0-9]+)/);
  if (match) return match[1];
  // fallback: if input looks like an ID, return as is
  if (/^[a-zA-Z0-9]+$/.test(input)) return input;
  return "";
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const documentId =
    typeof context.query.documentId === "string"
      ? context.query.documentId
      : "";
  let initialData = null;
  if (documentId) {
    setCredentials(process.env.LARK_APP_ID!, process.env.LARK_APP_SECRET!);

    setFsProvider(
      new LocalDiskFsProvider(process.cwd() + "/public/lark-files"),
    );
    initialData = await getLarkInitialDataForSSR(documentId);
  }
  return { props: { initialData, documentId } };
};

export default function Home({
  initialData,
  documentId,
}: {
  initialData: LarkApiContextValue | null;
  documentId: string;
}) {
  // Runtime check: ensure initialData is not a Promise
  if (
    initialData &&
    typeof (initialData as Promise<unknown>).then === "function"
  ) {
    throw new Error(
      "initialData is a Promise. It must be resolved before rendering.",
    );
  }
  const [input, setInput] = useState(documentId || "");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const docId = extractDocId(input);
    if (docId) {
      router.push(`/?documentId=${encodeURIComponent(docId)}`);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1>Lark to React (Next.js SSR)</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Enter Lark document URL"
            style={{
              width: "100%",
              padding: "8px 12px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            Load Document
          </button>
        </form>
      </header>
      {initialData ? (
        <>
          {Array.isArray(initialData.blocks) &&
            initialData.blocks.length > 0 && (
              <TableOfContents blocks={initialData.blocks} />
            )}
          <LarkRenderer initialData={initialData} />
        </>
      ) : (
        <div style={{ color: "#888" }}>
          Please enter a Lark document URL or ID above.
        </div>
      )}
    </div>
  );
}
