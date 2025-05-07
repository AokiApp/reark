# Setup Guide

This guide will help you get started with AokiApp Reark, including prerequisites, installation, and environment setup.

## Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (preferred), or npm/yarn/bun
- **Lark (Feishu) API credentials** (App ID & App Secret)
- **Japanese Fonts** (for visual regression testing)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/aokiapp/reark.git
cd reark
pnpm install
```

## Environment Setup

Create a `.env` file in your example app (see `.env.example` in each example) and set:

```
LARK_APP_ID=your-app-id
LARK_APP_SECRET=your-app-secret
```

## Japanese Font Requirement (for VRT)

Visual Regression Testing (VRT) requires Japanese fonts (e.g., Noto Sans CJK JP) to be installed.  
If missing, VRT tests may fail or produce incorrect snapshots.

### Install Noto Sans CJK JP

- **Ubuntu / Debian:**
  ```sh
  sudo apt update
  sudo apt install fonts-noto-cjk
  ```
- **CentOS / RHEL:**
  ```sh
  sudo yum install google-noto-sans-cjk-fonts
  ```
- **macOS (Homebrew):**
  ```sh
  brew tap homebrew/cask-fonts
  brew install --cask font-noto-sans-cjk
  ```
- **Windows (Chocolatey):**
  ```sh
  choco install noto
  ```
- Or download from [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP).

---

Continue to the [Usage Guide](usage.md) for your first integration.
