# CLAUDE.md

Website for The Albert Law Firm (salbertlaw.com): a Vue 2 single-page app on Netlify. Most
requests are content changes from the firm: a bio update, a new post on the Updated Legal Issues
page, a new phone number. Content is JSON in this repo; there is no CMS.

## Where things are

- `src/content/pages/<uid>.json`: one page each, shown at `https://salbertlaw.com/<uid>`. The file
  name must equal the `uid` inside it. A new page also needs links in both menus (desktop and
  mobile) in `HeaderFrame.vue`.
- `src/content/contact-info.json`: address lines, phone and email for the header, sidebar and footer.
- `public/content/images/`: images referenced from content as `/content/images/<file>`.
- `src/views/HeaderFrame.vue`: the menu, the footer and the three "Areas of Expertise" cards at the
  bottom of every page. These are written in the template, not in content files.
- `prismic-export/`: frozen backup of the old Prismic content. Never edit it or read content from it.

## Page structure

A page's `data.body` is a list of slices, at most one of each `slice_type`:

- `header`: `primary.banner_image` and `primary.white_text` (the large title over the banner).
- `left_content`: `primary.red_text` (red intro), `primary.main_text` (body text), and `items[]`
  as dated posts (`blog_post_title`, `blog_date` as `YYYY-MM-DD`, `blog_content`), shown newest
  first. Only `updated-legal-issues` has posts.
- `right_content`: the blue card (`contact_us_card_title`, `contact_us_card_text`) and the grey card
  below it (`success_stories_card_title`, `success_stories_card_text`; on attorney pages this is
  the Bar Admissions list). Pages with neither this slice nor a map show the firm's address card
  and the Areas of Expertise links instead.
- `map_content`: `primary.map_image`, `primary.map_title`, and `items[]` of `map_icon`, `icon_title`,
  `icon_description1` (home and contact pages).

## Rich-text format

Rich-text fields are arrays of blocks:

```json
{ "type": "paragraph", "text": "Call us today.", "spans": [{ "start": 0, "end": 7, "type": "strong" }] }
```

- Block types in use: `paragraph`, `heading1`, `heading2`, `heading3`.
- Span types in use: `strong`, `em`, `hyperlink`. A link span carries `data`, either
  `{ "link_type": "Web", "url": "https://..." }` or, for a page on this site,
  `{ "link_type": "Document", "type": "page", "uid": "contact-us" }`.
- `start` and `end` are offsets into that block's `text` (start inclusive, end exclusive, counted
  like JavaScript string indexes). Whenever you change `text`, recompute every span in that block.
  Wrong offsets do not break the build; they bold or link the wrong words, so check the page.
- Title fields (`white_text`, `blog_post_title`, `map_title`, card titles) are arrays too; the
  templates show `field[0].text`.

## Making a change

1. Work on a branch, never directly on `master`.
2. Edit the content files. Put new images in `public/content/images/` with a short lowercase name
   and the extension that matches the file's real format (photos are `.jpg`), and compress photos
   to a few hundred KB at most.
3. Run `npm run build`; it must finish without errors. It runs the content check first
   (`npm run check`), which catches a file name that doesn't match its `uid`, spans that don't
   fit their text, missing images, links to missing pages and malformed dates. It cannot catch a
   span on the wrong words, so then run `npm run serve`, open each changed page, and check the
   text, formatting and links.
4. Open a pull request that says in plain language what changed. Merging to `master` publishes it.

## Rules

- Change only what was asked. Use the firm's wording, names, numbers and legal claims exactly as
  given; do not rewrite or "improve" them.
- Do not upgrade dependencies or change the build setup as part of a content change (see README).
- Never edit DNS, Netlify settings or anything outside this repo.
