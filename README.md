# salbertlaw.com

Website for The Albert Law Firm. Vue 2 single-page app (Vue CLI 3), hosted on Netlify.

## Where the content lives

All text and images are in this repo. Nothing is loaded from a CMS.

| What | Where |
| --- | --- |
| Pages, one file each, shown at `/<uid>` | `src/content/pages/<uid>.json` |
| Address, phone and email (header, sidebar, footer) | `src/content/contact-info.json` |
| Images used in the content | `public/content/images/`, referenced as `/content/images/<file>` |
| Menu, footer and the three "Areas of Expertise" cards | `src/views/HeaderFrame.vue` |
| Logo and layout artwork | `src/assets/` |

Until November 2026 the content was fetched from Prismic in the browser. Prismic stopped serving
the repository (its CDN answered 403), which left the site blank. The content was exported and
converted into the files above. `prismic-export/` keeps that export unchanged as a backup: every
published document exactly as the API returned it, and the original full-size images. The site
does not read from it.

Content files keep Prismic's rich-text JSON format and are rendered by `prismic-vue`'s
`<prismic-rich-text>` component, which makes no network requests. [CLAUDE.md](CLAUDE.md) explains
the format and how to make a change.

## Development

Uses Node 22 (`.nvmrc`).

```
npm install
npm run serve    # dev server with hot reload
npm run check    # validate the content files
npm run build    # runs the check, then builds into dist/
```

The content check (`scripts/check-content.js`) makes sure page file names match their `uid`,
rich-text spans fit their text, images and linked pages exist, and post dates are `YYYY-MM-DD`.
Because the build runs it first, a broken edit fails the Netlify build and the live site stays
as it was.

Notes on keeping this 2019 toolchain building on current Node:

- `sass` (Dart Sass) replaces `node-sass`, which no longer installs.
- `.npmrc` sets `node-options=--openssl-legacy-provider`, which webpack 4 needs on Node 17+.
- `vue.config.js` loads Vue 2.5's template compiler with `MessageChannel` hidden. Otherwise the
  compiler opens a MessageChannel, and a build with a cold cache never exits.

## Hosting and domain

- Netlify builds with `netlify.toml` (`npm run build`, publishes `dist/`). `public/_redirects`
  sends every path to `index.html` for client-side routing.
- The domain is registered at Network Solutions, not through Netlify, and is paid through
  November 2027.
- DNS for salbertlaw.com is hosted on Netlify DNS. That zone also holds the firm's email records
  (MX, `autodiscover`, SPF). Do not delete the domain or its DNS zone from Netlify, or the firm's
  email stops working.
