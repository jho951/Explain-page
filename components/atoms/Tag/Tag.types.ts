import { Tag } from '@/components/atoms/Tag';
import { StoryObj } from '@storybook/nextjs-vite/vite-plugin';

type TagColor = 'default' | 'primary' | 'secondary' | 'danger';

type TagStory = StoryObj<typeof Tag>;

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  color?: TagColor;
}

export type { TagColor, TagProps, TagStory };
