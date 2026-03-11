import PortfolioLanding from '@/components/organisms/home/PortfolioLanding.tsx';
import PromoTiles from '@/components/organisms/home/PromoTiles.tsx';
import SpotlightSection from '@/components/organisms/home/SpotlightSection.tsx';

export default async function HomeTemplate() {
  return (
    <main>
      <PortfolioLanding />
      <PromoTiles />
      <SpotlightSection />
    </main>
  );
}
