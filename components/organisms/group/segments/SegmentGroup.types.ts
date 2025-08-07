import { ButtonSize, ButtonVariant } from '@/components/atoms/BaseButton';
import { ReactNode } from 'react';

interface Option {
  value: string;
  label: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

interface SegmentedGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export type { Option, SegmentedGroupProps };
