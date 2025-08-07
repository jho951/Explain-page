'use client';

import dynamic from 'next/dynamic';
import { MarkdownEditorProps } from '@/components/molecules/MarkdownEditor';
import styles from '@/components/molecules/MarkdownEditor/MarkdownEditor.module.css';

/**
 * @file MarkdownEditor.tsx
 * @description
 * 외부 마크다운 에디터(@uiw/react-md-editor)를 래핑한 molecule 컴포넌트입니다.
 * -  컨트롤드 값 관리, SSR 안전 동적 로딩 지원
 * - value/onChange로 상태 관리, height 등 주요 prop 확장 가능
 *
 * @usage
 * <MarkdownEditor value={markdown} onChange={setMarkdown} />
 *
 * @prop {string} value - 마크다운 텍스트(필수, 컨트롤드)
 * @prop {(value: string) => void} onChange - 값 변경 핸들러(필수)
 */

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className={styles.markdownEditorContainer}>
      <MDEditor
        value={value}
        onChange={(val = '', ...args) => onChange(val, ...args)}
        height={500}
      />
    </div>
  );
}

export { MarkdownEditor };
