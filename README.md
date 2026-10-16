# Greenbird

Marketing site, built from the "Home V2" frame of the Greenbird Figma file.

```sh
pnpm install
pnpm dev
```

## Fonts

Display type is **Inter Tight**, loaded from Fontsource. Body copy and the
dashboard title use two licensed faces, **Suisse Intl** and **PP Editorial New**.
They're first in their font stacks in `app/globals.css`, so they take over once
the font files are added (for example with `next/font/local`). Until then, Inter
and Newsreader stand in. Roboto Mono is used as designed.

## Assets

Everything in `public/images` was exported from the Figma file. The dot-texture
backgrounds and the logo are 2x/4x PNG renders. The icons are the original SVGs.
