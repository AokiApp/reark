# @reark/renderer

## Visual Regression Test (VRT) and Japanese Font Requirement

This package uses Visual Regression Testing (VRT) to ensure UI consistency.  
**VRT tests require Japanese fonts (e.g., Noto Sans CJK JP) to be installed on your environment.**  
If Japanese fonts are missing, VRT tests may fail or produce incorrect snapshots, especially for components rendering Japanese text.

### Why Japanese Fonts Are Needed

Some test cases and UI components render Japanese text.  
Without proper Japanese fonts, rendered output will differ (e.g., fallback to monospace or missing glyphs), causing VRT snapshot mismatches.

---

## How to Install Japanese Fonts

Install the following font:  
**Noto Sans CJK JP** (or equivalent Japanese font)

### Ubuntu / Debian

```sh
sudo apt update
sudo apt install fonts-noto-cjk
```

### CentOS / RHEL

```sh
sudo yum install google-noto-sans-cjk-fonts
```

### macOS (Homebrew)

```sh
brew tap homebrew/cask-fonts
brew install --cask font-noto-sans-cjk
```

### Windows (Chocolatey)

```sh
choco install noto
```

Or download and install from:  
https://fonts.google.com/noto/specimen/Noto+Sans+JP

---

## Notes

- Make sure to restart your test runner or development server after installing fonts.
- If you use a CI environment, ensure the above font installation steps are included in your CI setup.
- For other Linux distributions, install the equivalent Noto Sans CJK JP package.
