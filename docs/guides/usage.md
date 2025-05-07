# Usage Guide

This guide covers the basic usage of AokiApp Reark, including fetching and rendering Lark documents and integrating with Next.js.

## Installing the Core Package

Add the core package to your project:

```bash
npm install @aokiapp/reark
# or
pnpm add @aokiapp/reark
```

## Fetching and Rendering a Lark Document

Here’s how to fetch and render a Lark document in a Next.js App Router environment:

```tsx
import { setCredentials } from "@aokiapp/reark";
import { getLarkInitialDataForSSR } from "@aokiapp/reark-server";
import { LarkRenderer } from "@aokiapp/reark";
import "@aokiapp/reark/style.css";

// Set credentials (from env)
setCredentials(process.env.LARK_APP_ID, process.env.LARK_APP_SECRET);

// Fetch document data for SSR
const initialData = await getLarkInitialDataForSSR(
  documentId,
  "public/lark-files",
  "/lark-files/",
);

// Render in your component
<LarkRenderer initialData={initialData} />;
```

## Example Applications

- **App Router Example:** See [`examples/next-app-router`](../../examples/next-app-router)
- **Page Router Example:** See [`examples/next-page-router`](../../examples/next-page-router)

Each example includes a README with setup and usage instructions.

---

For advanced features and customization, continue to the [Advanced Guide](advanced.md).
