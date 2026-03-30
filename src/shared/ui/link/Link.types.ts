import { AnchorHTMLAttributes, ReactNode } from 'react';

interface BaseLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}

interface ActiveLinkProps extends BaseLinkProps {
  activeClassName?: string;
  exact?: boolean;
}

type LinkProps = BaseLinkProps;

export type { ActiveLinkProps, BaseLinkProps, LinkProps };
