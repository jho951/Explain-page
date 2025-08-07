'use client';

import { useEffect, useState } from 'react';
import { useAutosave } from '@/hooks/useAutoSave';

import styles from '@/styles/features/EditPage.module.css';
import { MarkdownEditor } from '@/components/molecules/MarkdownEditor';
import { ActionButton } from '@/components/atoms/ActionButton';

function EditTemplate() {
  const [value, setValue] = useState('**Hello Markdown!**');

  // 로컬스토리지 초기값 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('autosave-draft');
    if (saved) setValue(saved);
  }, []);

  // 30초마다 자동 저장
  useAutosave(value, 30000, content => {
    localStorage.setItem('autosave-draft', content);

    // if (userLoggedIn) {
    //   api.post('/autosave', { content }); // 서버에도 저장
    // }
  });

  return (
    <main className={styles.container}>
      <h1>✍️ 글 작성하기</h1>
      <p className={styles.subtext}>마크다운을 활용해 멋진 글을 작성하세요</p>

      <div className={styles.editorWrapper}>
        <MarkdownEditor value={value} onChange={val => setValue(val ?? '')} />
      </div>

      <div className={styles.actionRow}>
        <ActionButton className={styles.saveBtn}>저장하기</ActionButton>
      </div>
    </main>
  );
}

export default EditTemplate;
