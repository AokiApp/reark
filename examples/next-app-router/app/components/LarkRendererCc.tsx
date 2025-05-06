/* eslint-disable import/no-unresolved */
"use client";

import { type LarkApiContextValue, LarkRenderer } from "@aokiapp/reark";
import { TableOfContents } from "@aokiapp/reark";

export default function LarkRendererCc({
  initialData,
}: {
  initialData: LarkApiContextValue;
}) {
  return (
    <div>
      {initialData.blocks && initialData.blocks.length > 0 && (
        <TableOfContents blocks={initialData.blocks} />
      )}
      <LarkRenderer initialData={initialData} />
    </div>
  );
}
