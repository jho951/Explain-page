import { BaseForm } from '@/components/atoms/BaseForm';
import { StoryObj } from '@storybook/nextjs-vite/vite-plugin';
import { FormEvent, FormHTMLAttributes, ReactNode } from 'react';

type BaseFormStory = StoryObj<typeof BaseForm>;

interface BaseFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export type { BaseFormStory, BaseFormProps };
