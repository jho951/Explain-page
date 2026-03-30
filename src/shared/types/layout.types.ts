import React from 'react';
import type { Locale } from '@/shared/types';

/** layout.tsx에서 사용하는 기본 레이아웃 props */
interface RootLayoutProps {
  children: React.ReactNode;
}

/** Layout에서 사용하는 props (params까지 포함) */
interface LayoutProps extends CommonLayoutProps {
  params: LangParams;
}

/** CommonLayoutProps interface 설명을 여기에 작성하세요. */
export interface CommonLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
/** 공통 라우트 param 구조 */
export interface LangParams {
  lang: Locale;
}

/** 기본적인 페이지 prop 구조 (검색 쿼리 포함) */
interface BasePageProps {
  params: LangParams & { slug?: string };
  searchParams?: Record<string, string | string[]>;
}

/** 일반 페이지 컴포넌트에서 사용되는 props */
type PageProps = BasePageProps;

export type { RootLayoutProps, LayoutProps, PageProps };
