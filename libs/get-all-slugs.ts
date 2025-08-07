import fs from 'fs';
import path from 'path';

export function getAllSlugs(locale: string): string[] {
  const dir = path.join(process.cwd(), 'content', locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(file => /\.mdx?$/.test(file))
    .map(file => file.replace(/\.mdx?$/, ''));
}
