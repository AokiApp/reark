/* eslint-disable import/no-unresolved */
import { Suspense } from "react";

import LarkForm from "./components/LarkForm";
import {
  getLarkInitialDataForSSR,
  setFsProvider,
  // LocalDiskFsProvider,
  CloudflareR2FsProvider,
  setCredentials,
} from "@aokiapp/reark-server";
import LarkRendererCc from "./components/LarkRendererCc";
import "@aokiapp/reark/style.css";
import { PageProps } from "@/.next/types/app/page";

// Server Component
export default async function Page({ searchParams }: PageProps) {
  const documentId = (await searchParams).documentId as string | undefined;
  let initialData = null;

  if (documentId) {
    // Set credentials from env
    const appId = process.env.LARK_APP_ID;
    const appSecret = process.env.LARK_APP_SECRET;
    if (!appId || !appSecret) {
      throw new Error("LARK_APP_ID and LARK_APP_SECRET must be set in .env");
    }
    setCredentials(appId, appSecret);
    // Cloudflare R2 credentials from env
    const r2Bucket = process.env.R2_BUCKET;
    const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID;
    const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const r2Endpoint = process.env.R2_ENDPOINT;
    const r2PublicUrlBase = process.env.R2_PUBLIC_URL_BASE; // optional

    if (!r2Bucket || !r2AccessKeyId || !r2SecretAccessKey || !r2Endpoint) {
      throw new Error(
        "R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_ENDPOINT must be set in .env",
      );
    }

    setFsProvider(
      new CloudflareR2FsProvider({
        bucket: r2Bucket,
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
        endpoint: r2Endpoint,
        publicUrlBase: r2PublicUrlBase,
      }),
    );
    initialData = await getLarkInitialDataForSSR(documentId);
  }

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1>Lark to React (Next.js App Router)</h1>
        <LarkForm />
      </header>
      <Suspense fallback={<div>Loading document...</div>}>
        {initialData ? (
          <LarkRendererCc initialData={initialData} />
        ) : (
          <div style={{ color: "#888" }}>
            Please enter a Lark document URL or ID above.
          </div>
        )}
      </Suspense>
    </div>
  );
}
