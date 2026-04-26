# Shared Assets

This package contains SVG assets and other public resources shared across all Cabinetra applications.

## Usage

### In Next.js Apps

Reference assets from the shared package by creating a symlink or copying files to your public directory, or by importing them directly from the package:

```tsx
import Image from "next/image"

// Assets are available at relative path since this package is in node_modules
// Next.js will resolve them during build
export default function Component() {
  return (
    <Image
      src="/file-text.svg"
      alt="File"
      width={24}
      height={24}
    />
  )
}
```

## Available Assets

- `file-text.svg` - Document/file icon
- `globe.svg` - Global/world icon
- `next.svg` - Next.js logo
- `turborepo-dark.svg` - Turborepo dark theme logo
- `turborepo-light.svg` - Turborepo light theme logo
- `vercel.svg` - Vercel logo
- `window.svg` - Window/UI icon

## Adding New Assets

1. Add SVG file to the `public/` directory
2. Ensure it follows the naming convention: lowercase with hyphens
3. Optimize SVG for web if needed
4. Update this README with the new asset

## Notes

- All SVGs should be optimized and minified
- Keep file sizes small for better performance
- Use consistent naming conventions across assets
