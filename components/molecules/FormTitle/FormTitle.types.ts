import { ReactNode } from 'react';
import { IconName } from '@/components/atoms/Icon';

type FormTitleProps = {
  title: ReactNode;
  desc?: ReactNode;
  icon: IconName;
  size?: number;
  className?: string;
};

export type { FormTitleProps };
