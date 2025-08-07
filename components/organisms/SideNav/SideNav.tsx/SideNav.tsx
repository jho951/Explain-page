import { Link } from '@/components/atoms/Link';
import React from 'react';
export interface SideNavItem {
  label: string;
  href: string;
}
export function SideNav({ items }: { items: SideNavItem[] }) {
  return (
    <aside className="sidenav">
      <ul>
        {items.map(item => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
