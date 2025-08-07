'use client';
import { ActionButton } from '@/components/atoms/ActionButton';
import { ActiveInput } from '@/components/atoms/ActiveInput';
import { BaseForm } from '@/components/atoms/BaseForm';
import { CAPTCHA_SITE_KEY } from '@/constants/security';
import { useState } from 'react';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await grecaptcha.execute(CAPTCHA_SITE_KEY, { action: 'login' });

      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '인증 실패');

      alert('성공적으로 로그인 처리됨!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('에러 발생');
      }
    }
  };

  return (
    <BaseForm onSubmit={handleSubmit}>
      <ActiveInput
        type="email"
        placeholder="이메일"
        value={email}
        errorMessage={error}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <ActionButton type="submit" variant="primary" size="md">
        로그인
      </ActionButton>
    </BaseForm>
  );
}

export default SignInForm;
