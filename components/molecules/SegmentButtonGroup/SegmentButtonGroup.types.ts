import { ReactElement } from 'react';
import { SegmentButtonProps } from '@/components/atoms/SegmentButton';

interface SegmentButtonGroupProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactElement<SegmentButtonProps>[];
  className?: string;
}
export type { SegmentButtonGroupProps };
