import { notFound } from 'next/navigation';
import { getMarkdownContent } from '@/libs/get-mdx-content';
import { getAllSlugs } from '@/libs/get-all-slugs';
import { MDXRemote } from 'next-mdx-remote';

export async function generateStaticParams() {
  return getAllSlugs('ko').map(slug => ({ slug }));
}

type Props = { params: { slug: string } };

export default async function PostPage({ params }: Props) {
  const lang = 'ko';
  const { slug } = params;

  const data = await getMarkdownContent(slug, lang);

  if (!data) notFound();

  return (
    <article>
      <h1>{data.frontMatter.title}</h1>
      <MDXRemote {...data.mdxSource} />
    </article>
  );
}
