'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@jho951/ui-components';

import type { ActiveLinkProps } from './Link.types';

const ActiveLink = ({
  href,
  external,
  children,
  className,
  activeClassName = 'active',
  exact = false,
  ...rest
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isExternal = external ?? /^https?:\/\//.test(href);

  let isActive = false;
  if (!isExternal && pathname) {
    isActive = exact
      ? pathname === href
      : pathname === href || (href !== '/' && pathname.startsWith(href));
  }

  if (isExternal) {
    return (
      <a href={href} className={className} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={cn(className, { [activeClassName]: isActive })}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

export { ActiveLink };
