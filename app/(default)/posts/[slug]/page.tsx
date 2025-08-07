import { notFound } from 'next/navigation';

import { getMarkdownContent } from '@/libs/get-mdx-content';
import { getAllSlugs } from '@/libs/get-all-slugs';
import { MDXRemote } from 'next-mdx-remote';

type Props = { params: { locale: string; slug: string } };

// 정적 경로 생성
export async function generateStaticParams() {
  // 지원하는 언어 리스트
  const locales = ['ko', 'en'];
  // 각 언어별 모든 슬러그 조합을 paths로 만듦
  return locales.flatMap(locale => getAllSlugs(locale).map(slug => ({ locale, slug })));
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = params;
  const data = await getMarkdownContent(slug, locale);

  if (!data) notFound();

  return (
    <article>
      <h1>{data.frontMatter.title}</h1>
      <MDXRemote {...data.mdxSource} />
    </article>
  );
}
