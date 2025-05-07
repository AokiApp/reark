# Next.js App Router Example (`next-app-router`)

This example demonstrates how to integrate [AokiApp Reark](https://github.com/aokiapp/reark) with the modern [Next.js App Router](https://nextjs.org/docs/app), enabling server-side rendering (SSR) and rich rendering of Lark documents in a React application.

---

## 📝 Overview

- **Purpose:**  
  Showcases best practices for using `@aokiapp/reark` and `@aokiapp/reark-server` in a Next.js App Router project, including SSR, user-driven document selection, and seamless integration.
- **Audience:**  
  Developers looking to embed Lark documents in React/Next.js apps with SSR and modern routing.

---

## ✨ Key Features

- **Server-Side Rendering (SSR):**  
  Fetches and renders Lark documents on the server for fast, SEO-friendly pages.
- **User-Driven Document Selection:**  
  Enter a Lark document URL or ID to view its content.
- **Rich Rendering:**  
  Table of Contents, full block support, and styled output via `@aokiapp/reark`.
- **Modern Next.js App Router:**  
  Uses the latest Next.js routing and server actions.
- **Error Handling:**  
  Clear errors for missing environment variables or invalid document IDs.
- **Minimal, Extensible Setup:**  
  Easy to adapt for your own projects.

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- pnpm, yarn, or npm

### 1. Clone the Monorepo

```bash
git clone https://github.com/aokiapp/reark.git
cd reark/examples/next-app-router
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and set your Lark API credentials:

```env
LARK_APP_ID=your-app-id
LARK_APP_SECRET=your-app-secret
```

> **Note:** These credentials are required for SSR and API access.

### 3. Install Dependencies

```bash
pnpm install
# or
yarn install
# or
npm install
```

### 4. Start the Development Server

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> For more setup details, see [docs/examples.md](../../docs/examples.md).

---

## 🛠️ Usage Instructions

1. **Enter a Lark Document URL or ID:**  
   Use the input field at the top to paste a Lark doc URL (e.g. `https://lark.feishu.cn/docx/abc123...`) or just the document ID.

2. **View the Rendered Document:**  
   The app fetches and renders the document with a Table of Contents and full block support.

3. **Example Input:**

   ```
   https://lark.feishu.cn/docx/abc123xyz
   ```

4. **Example Output:**

   ![Screenshot: Rendered Lark Document](https://user-images.githubusercontent.com/your-screenshot.png) <!-- Replace with actual screenshot if available -->

5. **Data Flow Diagram:**

   ```mermaid
   flowchart TD
       User-->|Enters Doc URL/ID|LarkForm
       LarkForm-->|Redirects|Page
       Page-->|SSR Fetch|getLarkInitialDataForSSR
       Page-->|Passes Data|LarkRendererCc
       LarkRendererCc-->|Renders|LarkRenderer
   ```

---

## ⚙️ SSR, Customization, and Integration

### How SSR Works

- The main page (`app/page.tsx`) is an async server component.
- On load, it checks for a `documentId` in the URL.
- If present, it uses `getLarkInitialDataForSSR` from `@aokiapp/reark-server` to fetch and prepare the document data on the server.
- Credentials (`LARK_APP_ID`, `LARK_APP_SECRET`) are set via `setCredentials`.

### Customization

- **Renderer:**  
  The `LarkRendererCc` component wraps `LarkRenderer` and `TableOfContents`. You can customize or extend these components as needed.
- **Form:**  
  `LarkForm` can be styled or replaced to fit your UX.
- **Styling:**  
  The app imports `@aokiapp/reark/style.css` for default styles. Add your own CSS as needed.

### Integration Points

- Use the same SSR/data-fetching pattern in your own Next.js App Router projects.
- Swap out components or add providers in `app/layout.tsx` for further customization.

---

## 🧩 File Structure

```
examples/next-app-router/
├── app/
│   ├── components/
│   │   ├── LarkForm.tsx
│   │   └── LarkRendererCc.tsx
│   ├── layout.tsx
│   └── page.tsx
├── .env.example
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🐞 Troubleshooting & FAQ

### Q: I get an error about missing `LARK_APP_ID` or `LARK_APP_SECRET`.

A: Make sure you have copied `.env.example` to `.env` and set both variables.

### Q: The document does not render or says "Please enter a Lark document URL or ID above."

A: Ensure you entered a valid Lark doc URL or ID. Check your credentials and network access.

### Q: How do I debug SSR or API errors?

A: Check your terminal for error logs. Ensure your credentials are correct and have API access.

### Q: Can I use this with the classic Page Router?

A: See [next-page-router example](../next-page-router/README.md) for a Page Router version.

---

## 📚 Related Documentation

- [docs/examples.md](../../docs/examples.md) — Example app overview and setup
- [@aokiapp/reark documentation](../../packages/core/README.md)
- [Next.js App Router docs](https://nextjs.org/docs/app)
- [Lark API docs](https://open.larksuite.com/document/)

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for recent updates.

---

## License

[MIT](../../LICENSE)
