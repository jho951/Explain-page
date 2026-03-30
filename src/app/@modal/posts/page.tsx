'use client';
import { useRouter } from 'next/navigation';

export default function PostModal() {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div onClick={close}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', padding: '2rem' }}>
        <button onClick={close}>닫기</button>
      </div>
    </div>
  );
}
