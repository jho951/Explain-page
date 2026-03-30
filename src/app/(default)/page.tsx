import { DEFAULT_LOCALE } from '@/shared/config';
import { PortfolioLanding } from '@/features';

async function HomePage() {
  return <PortfolioLanding locale={DEFAULT_LOCALE} />;
}

export default HomePage;
