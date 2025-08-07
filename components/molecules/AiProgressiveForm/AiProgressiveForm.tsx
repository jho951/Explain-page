'use client';

import { useState } from 'react';
import { AiProgressiveFormProps } from '@/components/molecules/AiProgressiveForm';
import { BaseForm } from '@/components/atoms/BaseForm';

import styles from '@/components/molecules/AiProgressiveForm/AiProgressiveForm.module.css';
import { ActiveInput } from '@/components/atoms/ActiveInput';
import { ActionButton } from '@/components/atoms/ActionButton';
import { Spinner } from '@/components/atoms/Spinner';

/**
 * AIProgressiveForm
 *
 * 사용자의 답변에 따라 GPT-4가 다음 질문을 생성하는 점진적 폼
 */
function AiProgressiveForm() {
  const [steps, setSteps] = useState<AiProgressiveFormProps[]>([
    { question: '안녕하세요! 먼저 성함을 알려주세요.' },
  ]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const fetchNextQuestion = async (answer: string): Promise<string> => {
    const res = await fetch('/api/ai/get-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ previousAnswer: answer }),
    });

    const data = await res.json();
    return data.nextQuestion || '계속해서 더 이야기해 주세요.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAnswer.trim()) return;

    setLoading(true);

    const newSteps = [...steps];
    newSteps[newSteps.length - 1].answer = currentAnswer;
    setSteps(newSteps);

    const next = await fetchNextQuestion(currentAnswer);
    setSteps(prev => [...prev, { question: next }]);
    setCurrentAnswer('');
    setLoading(false);
  };

  const handleSummarize = async () => {
    setLoading(true);
    const res = await fetch('/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history: steps }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <BaseForm onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>AI Progressive Form</h2>

      <div className={styles.stack}>
        {steps.map((step, i) => (
          <div key={i} className={styles.block}>
            <p className={styles.question}>{step.question}</p>
            {step.answer && <p className={styles.answer}>💬 {step.answer}</p>}
          </div>
        ))}
      </div>

      {summary && (
        <div className={styles.summaryBlock}>
          <h3>🧠 요약 결과</h3>
          <pre>{summary}</pre>
        </div>
      )}

      {!summary && (
        <>
          <div className={styles.inputGroup}>
            <ActiveInput
              id="ai-input"
              placeholder="여기에 답변 입력"
              value={currentAnswer}
              onChange={e => setCurrentAnswer(e.target.value)}
              disabled={loading}
              required
            />
            <ActionButton type="submit" disabled={loading}>
              {loading ? <Spinner /> : '답변 제출'}
            </ActionButton>
          </div>

          {steps.length >= 5 && (
            <ActionButton
              type="button"
              variant="ghost"
              onClick={handleSummarize}
              disabled={loading}
            >
              ✅ 마무리하고 요약 보기
            </ActionButton>
          )}
        </>
      )}
    </BaseForm>
  );
}

export { AiProgressiveForm };
