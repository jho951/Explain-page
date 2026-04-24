import type { ComponentType, ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { InfoPage } from '@/features';
import { LegalModal } from '@/features/legal/components';
import { legalDocuments } from '@/features/legal/constants';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/shared/config';
import type { InfoPageKey } from '@/features';
import type { Locale } from '@/shared/types';

type LocalizedParams = { lang: Locale };
type RouteSearchParams = Record<string, string | string[] | undefined>;

interface LocalizedRouteProps<TParams extends object = object> {
  params: Promise<LocalizedParams & TParams>;
}

interface SlugRouteProps<TParams extends object = object> {
  params: Promise<{ slug?: string } & TParams>;
}

interface SearchRouteProps {
  searchParams?: Promise<RouteSearchParams>;
}

type LocalePageRenderer = (locale: Locale) => ReactNode | Promise<ReactNode>;
type LocalePageComponent = ComponentType<{ locale: Locale }>;

const resolveSupportedLocale = async <TParams extends { lang: Locale }>(
  params: Promise<TParams>,
): Promise<Locale> => {
  const { lang } = await params;

  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound();
  }

  return lang;
};

const createDefaultLocaleRoute = (render: LocalePageRenderer) => {
  async function DefaultLocaleRoute() {
    return render(DEFAULT_LOCALE);
  }

  return DefaultLocaleRoute;
};

const createLocalizedLocaleRoute = (render: LocalePageRenderer) => {
  async function LocalizedLocaleRoute({ params }: LocalizedRouteProps) {
    const locale = await resolveSupportedLocale(params);
    return render(locale);
  }

  return LocalizedLocaleRoute;
};

const createDefaultFeaturePage = (PageComponent: LocalePageComponent) =>
  createDefaultLocaleRoute(locale => <PageComponent locale={locale} />);

const createLocalizedFeaturePage = (PageComponent: LocalePageComponent) =>
  createLocalizedLocaleRoute(locale => <PageComponent locale={locale} />);

const createDefaultInfoPage = (pageKey: InfoPageKey) =>
  createDefaultLocaleRoute(locale => <InfoPage locale={locale} pageKey={pageKey} />);

const createLocalizedInfoPage = (pageKey: InfoPageKey) =>
  createLocalizedLocaleRoute(locale => <InfoPage locale={locale} pageKey={pageKey} />);

const createLegalModalPage = () => {
  async function LegalModalPage({ params }: SlugRouteProps<{ lang?: Locale }>) {
    const { slug } = await params;
    const document = slug ? legalDocuments[slug] : null;

    if (!slug || !document) notFound();

    return <LegalModal title={document.title} content={document.content} />;
  }

  return LegalModalPage;
};

export {
  createDefaultFeaturePage,
  createDefaultInfoPage,
  createDefaultLocaleRoute,
  createLegalModalPage,
  createLocalizedFeaturePage,
  createLocalizedInfoPage,
  createLocalizedLocaleRoute,
  resolveSupportedLocale,
};
export type { LocalizedRouteProps, RouteSearchParams, SearchRouteProps, SlugRouteProps };
