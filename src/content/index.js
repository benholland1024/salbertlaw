// All of the site's words and images live in this folder and in public/content/images.
// (Until 2026 they were fetched from Prismic in the browser. The Prismic repo was
// exported to /prismic-export and converted into these files, so the site no longer
// depends on any Prismic account or API.)
//
//   pages/<uid>.json    one file per page, shown at https://salbertlaw.com/<uid>
//                       (the file name must match the "uid" inside the file)
//   contact-info.json   address, phone and email used in the header, sidebar and footer
//
// Rich-text fields keep Prismic's rich-text JSON format and are rendered by
// prismic-vue's <prismic-rich-text> component, exactly as before.

import contactInfo from './contact-info.json';

const pageFiles = require.context('./pages', false, /\.json$/);
const pages = {};
pageFiles.keys().forEach((key) => {
  const doc = pageFiles(key);
  pages[doc.uid] = doc;
});

export function getPage(uid) {
  return pages[uid] || null;
}

export function getContactInfo() {
  return contactInfo;
}
