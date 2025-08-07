'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

import { useScrollLock } from '@/hooks/useScroll';

import { ModalProps } from '@/components/molecules/Modal/Modal.types';

import { Backdrop } from '@/components/atoms/Backdrop';

import styles from '@/components/molecules/Modal/Modal.module.css';

function Modal({ content, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(mounted);

  // ESC 키 닫기 (접근성)
  useEffect(() => {
    if (!mounted) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted, onClose]);

  // mount + 트랜지션 처리
  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(() => setVisible(true), 10);
    // 첫 렌더 시 포커스 (접근성)
    setTimeout(() => {
      modalRef.current?.focus();
    }, 20);
    return () => {
      setMounted(false);
      setVisible(false);
      clearTimeout(timeout);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <Backdrop visible={visible} onClick={onClose} className={styles.overlay} />
      <div
        className={`${styles.modal} ${visible ? styles.show : ''}`}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="미리보기"
        onClick={e => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2>미리보기</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="닫기">
            닫기
          </button>
        </header>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>,
    document.body,
  );
}

export { Modal };
