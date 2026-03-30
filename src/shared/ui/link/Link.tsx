import NextLink from 'next/link';

import type { LinkProps } from './Link.types';

/**
 * @file Link.tsx
 * @description
 * 공통 Link(링크) 컴포넌트입니다.
 * - 내부/외부 링크 자동 분기, className 등 일관된 링크 관리.
 * - 서버 컴포넌트에서도 사용할 수 있도록 client hook을 사용하지 않습니다.
 *
 * @usage
 * ```tsx
 * <Link href="/about">About</Link>
 * <Link href="https://naver.com" external>네이버</Link>
 * ```
 *
 * @prop {string} href - 이동할 경로(내부/외부)
 * @prop {boolean} [external] - 외부 링크 여부(자동 감지, 수동 지정 모두 지원)
 * @prop {ReactNode} children - 링크 텍스트/내용
 * @prop {string} [className] - 커스텀 클래스명
 */

const Link = ({ href, external, children, className, ...rest }: LinkProps) => {
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={className} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} {...rest}>
      {children}
    </NextLink>
  );
};

export { Link };
