import { marked } from "marked";

// Import all .md files from the changelog directory
const ctx = require.context("../../../changelog", false, /\.md$/);

function parseChangelog(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  const meta = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx !== -1) {
      meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return {
    date: meta.date ? meta.date.split("-").map(Number) : [],
    name: meta.name || undefined,
    info: marked.parse(match[2].trim())
  };
}

export const changelog = ctx
  .keys()
  .map(key => parseChangelog(ctx(key)))
  .filter(Boolean)
  .sort((a, b) => {
    for (let i = 0; i < 3; i++) {
      if (a.date[i] !== b.date[i]) return b.date[i] - a.date[i];
    }
    return 0;
  });

for (let i = 0; i < changelog.length; i++) {
  changelog[i].id = i;
}
