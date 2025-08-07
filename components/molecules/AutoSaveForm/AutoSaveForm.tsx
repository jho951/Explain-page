'use client';

import { FormEvent, useState } from 'react';

import { useAutosave } from '@/hooks/useAutoSave';

import styles from '@/components/molecules/AutoSaveForm/AutoSaveForm.module.css';
import { Textarea } from '@/components/atoms/Textarea';
import { ActiveInput } from '@/components/atoms/ActiveInput';
import { BaseForm } from '@/components/atoms/BaseForm';
import { ActionButton } from '@/components/atoms/ActionButton';

/**
 * AutoSaveForm 컴포넌트
 *
 * - 제목(title)과 내용(content)을 입력하는 폼
 * - 입력 중 1초 동안 변화가 없으면 자동 임시 저장 (debounce)
 * - 저장 중 상태, 마지막 저장 시간 표시
 * - 수동 제출(Submit) 기능 제공
 *
 * @example
 * ```tsx
 * <AutoSaveForm />
 * ```
 */
function AutoSaveForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  /**
   * 자동 저장 API 호출 함수
   * @param draft - { title, content } 객체
   */
  const handleAutosave = async (draft: { title: string; content: string }) => {
    setIsSaving(true);
    try {
      await fetch('/api/draft/save', {
        method: 'POST',
        body: JSON.stringify(draft),
        headers: { 'Content-Type': 'application/json' },
      });
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 수동 제출 핸들러
   * @param e - React.FormEvent
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('제출 완료!');
  };

  /**
   * useAutosave 훅 사용 예시
   *
   * @example
   * useAutosave({ title, content }, 1000, draft => {
   *   if (!draft.title && !draft.content) return;
   *   handleAutosave(draft);
   * });
   *
   * @param value - 감시할 값(여기서는 draft: {title, content})
   * @param delay - debounce 대기 시간(ms)
   * @param onSave - debounce 후 실행할 함수
   */
  useAutosave({ title, content }, 1000, draft => {
    if (!draft.title && !draft.content) return;
    handleAutosave(draft);
  });

  return (
    <BaseForm onSubmit={handleSubmit}>
      <ActiveInput
        id="title"
        placeholder="제목 입력"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Textarea
        id="content"
        className={styles.textarea}
        placeholder="내용을 작성하세요..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <aside className={styles.status}>
        {isSaving ? (
          <span className={styles.saving}>⏳ 저장 중...</span>
        ) : lastSaved ? (
          <span className={styles.saved}>✅ {lastSaved.toLocaleTimeString()}에 저장됨</span>
        ) : (
          <span className={styles.idle}>📝 입력 대기 중</span>
        )}
      </aside>

      <ActionButton type="submit" className={styles.submitButton}>
        제출하기
      </ActionButton>
    </BaseForm>
  );
}
export { AutoSaveForm };
