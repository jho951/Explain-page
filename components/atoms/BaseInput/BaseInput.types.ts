/**
 * 버튼 크기 정의
 */
type inputSize = 'sm' | 'md' | 'lg';

/**
 * BaseInputProps interface 설명을 여기에 작성하세요.
 */
interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string | null;
  inputSize?: inputSize;
}

export type { BaseInputProps };
