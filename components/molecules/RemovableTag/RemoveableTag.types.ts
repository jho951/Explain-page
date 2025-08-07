import { TagProps } from '@/components/atoms/Tag';

interface RemovableTagProps extends Omit<TagProps, 'removable' | 'onRemove'> {
  onRemove: () => void;
}

export type { RemovableTagProps };
