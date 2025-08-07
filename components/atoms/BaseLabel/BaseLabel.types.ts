import { LabelHTMLAttributes } from 'react';

import { StoryObj } from '@storybook/nextjs-vite/vite-plugin';
import { BaseLabel } from '@/components/atoms/BaseLabel';

type LabelVariant = 'default' | 'inline' | 'capsule' | 'error' | 'floating' | 'filled' | 'outlined';

type LabelStory = StoryObj<typeof BaseLabel>;

interface BaseLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  variant?: LabelVariant;
}

export type { LabelVariant, LabelStory, BaseLabelProps };
