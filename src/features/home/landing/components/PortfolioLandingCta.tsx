'use client';

import { useRouter } from 'next/navigation';

import { DEFAULT_LOCALE, START_FRONTEND_URL } from '@/shared/config';
import { useAppSelector } from '@/shared/state/hooks';
import type { Locale } from '@/shared/types';

interface PortfolioLandingCtaProps {
  className: string;
  locale: Locale;
  label: string;
}

function PortfolioLandingCta({ className, locale, label }: PortfolioLandingCtaProps) {
  const router = useRouter();
  const authStatus = useAppSelector(state => state.auth.status);

  const signInHref = locale === DEFAULT_LOCALE ? '/signin' : `/${locale}/signin`;

  const handleClick = () => {
    if (authStatus === 'authenticated' && START_FRONTEND_URL) {
      window.location.assign(START_FRONTEND_URL);
      return;
    }

    if (authStatus === 'authenticated') {
      router.push(locale === DEFAULT_LOCALE ? '/' : `/${locale}`);
      return;
    }

    router.push(signInHref);
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {label}
    </button>
  );
}

export default PortfolioLandingCta;
