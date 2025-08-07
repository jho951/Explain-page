import React from 'react';
import { Link } from '@/components/atoms/Link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, idx) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            {idx < items.length - 1 && ' / '}
          </li>
        ))}
      </ol>
    </nav>
  );
}
