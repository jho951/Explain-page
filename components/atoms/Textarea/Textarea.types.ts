import { TextareaHTMLAttributes } from 'react';

import { StoryObj } from '@storybook/nextjs-vite/vite-plugin';

import { Textarea } from '@/components/atoms/Textarea';

type TextareaStory = StoryObj<typeof Textarea>;
/**
 * TextareaProps interface 설명을 여기에 작성하세요.
 */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

export type { TextareaStory, TextareaProps };
