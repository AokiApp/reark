# Frequently Asked Questions (FAQ)

## General

**Q: What is AokiApp Reark?**  
A: A modular TypeScript monorepo for rendering and processing Lark (Feishu) documents as React components, with SSR and Next.js integration.

**Q: Which Node.js version is required?**  
A: Node.js v18 or higher is recommended.

## Setup & Installation

**Q: How do I install the required Japanese fonts for testing?**  
A: See the [Setup Guide](guides/setup.md) and [Testing Guide](guides/testing.md) for platform-specific instructions.

**Q: Where do I put my Lark API credentials?**  
A: In a `.env` file in your example app directory. See the [Setup Guide](guides/setup.md).

## Usage

**Q: How do I render a Lark document in my app?**  
A: Use the `LarkRenderer` component from the core package. See the [Usage Guide](guides/usage.md).

**Q: Can I customize block rendering?**  
A: Yes, pass custom components via the `components` prop to `LarkRenderer`. See the [Advanced Guide](guides/advanced.md).

## Troubleshooting

**Q: My VRT tests fail or produce incorrect snapshots. What should I do?**  
A: Ensure Japanese fonts are installed and restart your test runner. See the [Testing Guide](guides/testing.md).

**Q: I get API errors when fetching Lark documents.**  
A: Check your API credentials and network connectivity. See the [Troubleshooting Guide](troubleshooting.md).

---

For more help, open an issue on GitHub or consult the relevant guide.
