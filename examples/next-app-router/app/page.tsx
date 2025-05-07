/* eslint-disable import/no-unresolved */
import { Suspense } from "react";

import LarkForm from "./components/LarkForm";
import { setCredentials } from "@aokiapp/reark";
import {
  getLarkInitialDataForSSR,
  setFsProvider,
  LocalDiskFsProvider,
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
    setFsProvider(
      new LocalDiskFsProvider(process.cwd() + "/public/lark-files"),
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
