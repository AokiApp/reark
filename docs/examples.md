# Example Applications

AokiApp Reark includes two example Next.js applications to demonstrate integration and usage patterns:

## Example Apps

| Example App      | Router Type | SSR Support | Usage Demo                                       |
| ---------------- | ----------- | ----------- | ------------------------------------------------ |
| next-app-router  | App Router  | Yes         | [README](../examples/next-app-router/README.md)  |
| next-page-router | Page Router | Yes         | [README](../examples/next-page-router/README.md) |

## Setup

Each example app includes a `.env.example` file. Copy it to `.env` and set your Lark API credentials:

```
LARK_APP_ID=your-app-id
LARK_APP_SECRET=your-app-secret
```

Install dependencies and run the example:

```bash
cd examples/next-app-router
pnpm install
pnpm dev
```

or

```bash
cd examples/next-page-router
pnpm install
pnpm dev
```

## What Each Example Demonstrates

- **App Router Example:**  
  Modern Next.js routing, SSR, and integration with the core and server packages.

- **Page Router Example:**  
  Classic Next.js routing, SSR, and integration patterns.

Refer to each example’s README for detailed instructions and advanced usage.

---
