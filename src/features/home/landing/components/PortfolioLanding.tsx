import { Locale } from '@/shared/types';

import styles from './PortfolioLanding.module.css';
import {
  ArchitectureSection,
  FeatureSection,
  FlowSection,
  FooterCtaSection,
  HeroSection,
  ValueSection,
} from './HomeSections';

interface PortfolioLandingProps {
  locale: Locale;
}

export default function PortfolioLanding({ locale }: PortfolioLandingProps) {
  return (
    <div className={styles.page}>
      <HeroSection locale={locale} />
      <ValueSection locale={locale} />
      <FlowSection locale={locale} />
      <FeatureSection locale={locale} />
      <ArchitectureSection locale={locale} />
      <FooterCtaSection locale={locale} />
    </div>
  );
}
