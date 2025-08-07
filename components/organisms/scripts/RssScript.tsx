type Props = { lang: string };

export default function RssScript({ lang }: Props) {
  const href = lang === 'ko' ? '/rss.xml' : `/rss-${lang}.xml`;

  return (
    <link
      rel="alternate"
      type="application/rss+xml"
      title={`개발 블로그 RSS (${lang})`}
      href={href}
    />
  );
}
