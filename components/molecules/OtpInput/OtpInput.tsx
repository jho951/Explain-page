'use client';
import { useState, useRef } from 'react';
import { OtpInputProps } from '@/components/molecules/OtpInput/OtpInput.types';
import { ActiveInput } from '@/components/atoms/ActiveInput';

const OtpInput = ({ length = 6, onComplete, autoFocus }: OtpInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newValues.every(v => v !== '') && onComplete) {
      onComplete(newValues.join(''));
    }
  };

  return (
    <div>
      {values.map((val, i) => (
        <ActiveInput
          key={i}
          ref={el => {
            inputs.current[i] = el;
          }}
          value={val}
          onChange={e => handleChange(i, e.target.value)}
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          inputMode="numeric"
          style={{ textAlign: 'center' }}
        />
      ))}
    </div>
  );
};

export { OtpInput };
