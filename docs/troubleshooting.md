# Troubleshooting Guide

This guide provides solutions to common issues encountered when using AokiApp Reark.

## Visual Regression Testing (VRT) Issues

**Problem:** VRT tests fail or produce incorrect snapshots.  
**Solution:**

- Ensure Japanese fonts (e.g., Noto Sans CJK JP) are installed.
- Restart your test runner or development server after installing fonts.
- Check your CI pipeline for font installation steps.

## API Errors

**Problem:** Errors when fetching Lark documents or blocks.  
**Solution:**

- Verify your Lark API credentials in the `.env` file.
- Ensure your network connection is stable.
- Check for API rate limits or permission issues.

## SSR/Rendering Issues

**Problem:** SSR fails or rendered output is incorrect.  
**Solution:**

- Ensure you are using the correct server utilities from `@aokiapp/reark-server`.
- Check asset paths and public directory configuration.
- Review integration examples in the [Examples Guide](examples.md).

## Dependency or Build Errors

**Problem:** Errors during installation or build.  
**Solution:**

- Use Node.js v18 or higher.
- Run `pnpm install` from the project root.
- Delete `node_modules` and reinstall if issues persist.

## Other Issues

- Consult the [FAQ](faq.md) for more answers.
- Open an issue on GitHub if your problem is not listed.

---
