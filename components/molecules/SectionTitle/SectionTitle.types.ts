import { ReactNode } from 'react';

type SectionTitleProps = {
  title: ReactNode;
  desc?: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
};

export type { SectionTitleProps };
