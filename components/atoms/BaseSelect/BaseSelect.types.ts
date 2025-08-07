import { ReactNode, SelectHTMLAttributes } from 'react';

interface BaseSelectOption {
  id: number;
  value: string;
  label: string;
  disabled?: boolean;
}

interface BaseSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  errorMessage?: string;
  options?: BaseSelectOption[];
  children?: ReactNode;
}

export type { BaseSelectOption, BaseSelectProps };
