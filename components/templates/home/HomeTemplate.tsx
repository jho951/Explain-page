import { HomeSocial } from '@/components/organisms/HomeSocial/HomeSocial';
import HeroSection from '@/components/organisms/home/HeroSection';

import PromoTiles from '@/components/templates/home/PromoTiles';
import SpotlightSection from '@/components/templates/home/SpotlightSection';
import WritingFeature from '@/components/templates/home/WritingFeature';
import { PROJECT_URL } from '@/constants/security';

export default async function HomeTemplate() {
  // const res = await fetch(`${PROJECT_URL}/api/posts?limit=5`, { cache: 'no-store' });
  const res = await fetch(`${PROJECT_URL}/mock/posts.json`, { cache: 'no-store' });
  const posts = await res.json();

  return (
    <main>
      <HeroSection />
      <WritingFeature posts={posts} />
      <PromoTiles />

      <SpotlightSection />
      <HomeSocial />
    </main>
  );
}
