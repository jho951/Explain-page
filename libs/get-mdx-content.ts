import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export async function getMarkdownContent(slug: string, locale: string) {
  if (!slug || !locale) {
    throw new Error(
      `[getMarkdownContent] Invalid slug or locale: slug="${slug}", locale="${locale}"`,
    );
  }

  const filepath = path.join(process.cwd(), 'content', locale, `${slug}.mdx`);
  console.log('[getMarkdownContent] filepath:', filepath);

  if (!fs.existsSync(filepath)) return null;

  const source = fs.readFileSync(filepath, 'utf-8');
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, { scope: data });

  return { mdxSource, frontMatter: data };
}
