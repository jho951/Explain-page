// 옵션 한 개의 타입

import { ReactNode } from 'react';

import { ButtonVariant } from '@/components/atoms/BaseButton';
import { BaseSelectOption, BaseSelectProps } from '@/components/atoms/BaseSelect';
import { Locale } from '@/types/locale';

// 공통 Select Props (DropdownSelect 등에서 사용)
/**
 * SelectProps interface 설명을 여기에 작성하세요.
 */
interface DropdownSelectProps<T extends BaseSelectOption = BaseSelectOption>
  extends Omit<BaseSelectProps, 'options' | 'value' | 'onChange' | 'children'> {
  options: T[];
  value?: string; // 또는 T['value'], T['value']가 string이 아니면 string | number로 맞춰도 됨
  onChange: (value: T['value']) => void;
  placeholder?: ReactNode;
  variant?: ButtonVariant;
  renderOptionLabel?: (option: T) => ReactNode;
}

/**
 * 언어 선택 항목을 표현하는 인터페이스
 */
interface LocaleOption {
  /** 고유 ID (예: dropdown에서 key로 사용) */
  id: number;
  /** 언어 코드 (ex. 'en', 'ko') */
  value: Locale;
  /** 사용자에게 보여질 언어명 라벨 */
  label: string;
}

/**
 * 비동기 옵션을 검색해서 렌더링하는 Select 컴포넌트
 *
 * @template T - SelectOption을 확장한 제네릭 타입
 * @param {T['value']} value - 현재 선택된 값
 * @param {(value: T['value']) => void} onChange - 선택 시 호출되는 콜백
 * @param {(input: string) => Promise<T[]>} fetchOptions - 입력값 기반으로 옵션 목록을 가져오는 함수
 * @param {string} [placeholder] - 입력창 placeholder 텍스트
 * @param {string} [loadingText] - 로딩 중 텍스트
 * @param {string} [noOptionsText] - 결과 없음 텍스트
 * @param {(option: T) => React.ReactNode} [renderOptionLabel] - 옵션 커스터마이징 렌더 함수
 * @param {string} [className] - 추가 클래스 이름
 */
/**
 * AsyncSelectProps interface 설명을 여기에 작성하세요.
 */
interface AsyncSelectProps<T extends BaseSelectOption> {
  value: T['value'];
  onChange: (value: T['value']) => void;
  fetchOptions: (input: string) => Promise<T[]>;
  placeholder?: string;
  loadingText?: string;
  noOptionsText?: string;
  renderOptionLabel?: (option: T) => React.ReactNode;
  className?: string;
}

export type { DropdownSelectProps, LocaleOption, AsyncSelectProps };
