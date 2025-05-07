# Advanced Guide

This guide covers advanced features and customization options in AokiApp Reark.

## Server-Side Rendering (SSR)

AokiApp Reark is designed for seamless SSR integration, especially with Next.js. Use the `@aokiapp/reark-server` package to fetch and prepare Lark document data on the server.

**Example:**

```tsx
import { getLarkInitialDataForSSR } from "@aokiapp/reark-server";

const initialData = await getLarkInitialDataForSSR(
  documentId,
  "public/lark-files",
  "/lark-files/",
);
```

## Custom Block Rendering

You can extend or override block rendering by providing custom React components.

**Example:**

```tsx
import { LarkRenderer } from "@aokiapp/reark";
import { MyCustomBlock } from "./MyCustomBlock";

<LarkRenderer
  initialData={initialData}
  components={{
    CustomBlock: MyCustomBlock,
  }}
/>;
```

## Extending the Renderer

- Add support for new block types by implementing and registering new components.
- Customize existing block rendering by passing your own components via the `components` prop.

## Advanced Configuration

- **Asset Management:** Configure asset paths for images and files.
- **Theming:** Apply custom styles or themes by overriding CSS or using the `className` prop.
- **Localization:** Support multiple languages by customizing text and formatting.

## Example: Custom Theming

```tsx
<LarkRenderer initialData={initialData} className="my-custom-theme" />
```

---

For testing and development best practices, see the [Testing Guide](testing.md).
