import React, { JSX } from 'react';
import styles from './OverflowSection.module.css';

type Variant = 'right' | 'left' | 'full';

type OverflowSectionProps = {
  variant?: Variant;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
};

export function OverflowSection({
  variant = 'right',
  as: Tag = 'section',
  className,
  children,
  ...props
}: OverflowSectionProps) {
  return (
    <Tag
      className={[styles.overflowSection, styles[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
