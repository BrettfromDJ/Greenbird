# Greenbird

Marketing site, built from the "Home V2" frame of the Greenbird Figma file.

```sh
pnpm install
pnpm dev
```

## Fonts

The design uses three licensed faces: **Brockmann** (display), **Suisse Intl** (body)
and **PP Editorial New** (the dashboard title). They're first in each font stack in
`app/globals.css`, so they take over once the font files are added (for example
with `next/font/local`). Until then, open stand-ins load from Fontsource: Manrope,
Inter and Newsreader. Roboto Mono is used as designed.

## Assets

Everything in `public/images` was exported from the Figma file. The dot-texture
backgrounds and the logo are 2x/4x PNG renders. The icons are the original SVGs.
