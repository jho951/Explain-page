import { ChangeEvent } from 'react';

interface MarkdownEditorProps<State = unknown> {
  value: string;
  onChange: (value: string, event?: ChangeEvent<HTMLTextAreaElement>, state?: State) => void;
}

export type { MarkdownEditorProps };
