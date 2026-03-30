import { NextRequest, NextResponse } from 'next/server';

import { LOCALE_COOKIE, SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/shared/config/locale';
import type { Locale } from '@/shared/types/locale.types';

function isLocale(x: string): x is Locale {
  return SUPPORTED_LOCALES.includes(x as Locale);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(png|jpe?g|svg|css|js|ico|woff2?|map)$/.test(pathname)
  )
    return NextResponse.next();

  if (firstSegment === DEFAULT_LOCALE) {
    const restPath = segments.slice(1).join('/');
    const url = req.nextUrl.clone();
    url.pathname = `/${restPath}`;
    return NextResponse.redirect(url);
  }

  if (pathname === '/') {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, DEFAULT_LOCALE, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
    return res;
  }

  if (isLocale(firstSegment)) {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
    return res;
  }

  const lang = req.cookies.get(LOCALE_COOKIE)?.value ?? DEFAULT_LOCALE;

  if (lang !== DEFAULT_LOCALE && isLocale(lang)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
