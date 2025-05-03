/* eslint-disable import/no-unresolved */
//"use client";

import { type LarkApiContextValue, LarkRenderer } from "@aokiapp/reark";

export default function LarkRendererCc({
  initialData,
}: {
  initialData: LarkApiContextValue;
}) {
  return <LarkRenderer initialData={initialData} />;
}
