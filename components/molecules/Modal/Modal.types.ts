import { ReactNode } from 'react';

/**
 * Modal props입니다.
 */
interface ModalProps {
  content: string;
  onClose: () => void;
  children: ReactNode;
}

export type { ModalProps };
