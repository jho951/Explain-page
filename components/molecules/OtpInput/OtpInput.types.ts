/**
 * OTPInputProps interface 설명을 여기에 작성하세요.
 */
interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
}

export type { OtpInputProps };
