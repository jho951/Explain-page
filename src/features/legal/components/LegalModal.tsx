'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './LegalModal.module.css';

interface LegalModalProps {
  title: string;
  content: string;
}

function LegalModal({ title, content }: LegalModalProps) {
  const router = useRouter();

  const close = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  return (
    <div className={styles.overlay} onClick={close}>
      <article
        role="dialog"
        aria-modal="true"
        aria-label={`${title} policy`}
        className={styles.modal}
        onClick={event => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={styles.closeButton} onClick={close}>
            닫기
          </button>
        </header>
        <div className={styles.body}>
          <p className={styles.content}>{content}</p>
        </div>
      </article>
    </div>
  );
}

export default LegalModal;
