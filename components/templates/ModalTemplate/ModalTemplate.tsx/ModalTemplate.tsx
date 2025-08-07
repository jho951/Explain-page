import React from 'react';
export interface ModalTemplateProps {
  children: React.ReactNode;
}
export function ModalTemplate({ children }: ModalTemplateProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
}
