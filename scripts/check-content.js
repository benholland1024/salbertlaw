// Checks the content files. `npm run build` runs this first, so a broken edit fails the
// build (and Netlify keeps serving the previous version) instead of breaking the live site.
// Run it on its own with `npm run check`.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pagesDir = path.join(root, 'src/content/pages');
const imagesDir = path.join(root, 'public/content/images');
const errors = [];

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    errors.push(`${path.relative(root, file)}: not valid JSON (${e.message})`);
    return null;
  }
}

// Call visit(node, where) for every object inside value.
function walk(value, where, visit) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${where}[${i}]`, visit));
  } else if (value && typeof value === 'object') {
    visit(value, where);
    Object.keys(value).forEach((k) => walk(value[k], `${where}.${k}`, visit));
  }
}

const docs = {};
const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.json'));
const uids = new Set(files.map((f) => f.replace(/\.json$/, '')));

files.forEach((f) => {
  const doc = readJson(path.join(pagesDir, f));
  if (!doc) return;
  const uid = f.replace(/\.json$/, '');
  if (doc.uid !== uid) errors.push(`pages/${f}: "uid" is "${doc.uid}" but must match the file name ("${uid}")`);
  if (doc.type !== 'page') errors.push(`pages/${f}: "type" must be "page"`);
  if (!doc.data || !Array.isArray(doc.data.body)) errors.push(`pages/${f}: "data.body" must be a list of slices`);
  docs[`pages/${f}`] = doc;
});

const contact = readJson(path.join(root, 'src/content/contact-info.json'));
if (contact) {
  ['address_line_1', 'address_line_2', 'address_line_3', 'phone', 'email'].forEach((k) => {
    const v = contact.data && contact.data[k];
    if (!Array.isArray(v) || !v[0] || typeof v[0].text !== 'string') errors.push(`contact-info.json: data.${k}[0].text is missing`);
  });
  docs['contact-info.json'] = contact;
}

Object.entries(docs).forEach(([name, doc]) => {
  walk(doc, name, (node, where) => {
    // Rich-text spans must sit inside their block's text.
    if (typeof node.text === 'string' && Array.isArray(node.spans)) {
      node.spans.forEach((s, i) => {
        const ok = Number.isInteger(s.start) && Number.isInteger(s.end) && s.start >= 0 && s.start < s.end && s.end <= node.text.length;
        if (!ok) errors.push(`${where}.spans[${i}]: ${s.type} span ${s.start}-${s.end} does not fit the block's text (length ${node.text.length}): "${node.text.slice(0, 60)}"`);
      });
    }
    // Images must exist in public/content/images.
    if (typeof node.url === 'string' && node.url.startsWith('/content/images/')) {
      if (!fs.existsSync(path.join(imagesDir, node.url.slice('/content/images/'.length)))) {
        errors.push(`${where}.url: ${node.url} is not in public/content/images/`);
      }
    }
    // Links to other pages must point at a page that exists.
    if (node.link_type === 'Document' && !uids.has(node.uid)) errors.push(`${where}: links to page "${node.uid}", which does not exist`);
    // Post dates must be YYYY-MM-DD.
    if ('blog_date' in node && node.blog_date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(node.blog_date)) {
      errors.push(`${where}.blog_date: "${node.blog_date}" must look like 2026-11-11`);
    }
  });
});

if (errors.length) {
  console.error(`Content check failed (${errors.length} problem${errors.length === 1 ? '' : 's'}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Content check passed: ${files.length} pages and the contact info.`);
