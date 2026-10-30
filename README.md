# Greenbird

Marketing site, built from the "Home V2" frame of the Greenbird Figma file.

```sh
pnpm install
pnpm dev
```

## Fonts

Display type is **Inter Tight**, loaded from Fontsource. Body copy uses the
licensed **Suisse Intl**, first in its font stack in `app/globals.css`, so it
takes over once the font files are added (for example with `next/font/local`).
Until then, Inter stands in. Roboto Mono is used as designed.

## Assets

Everything in `public/images` was exported from the Figma file. The dot-texture
backgrounds and the logo are 2x/4x PNG renders. The icons are the original SVGs.
