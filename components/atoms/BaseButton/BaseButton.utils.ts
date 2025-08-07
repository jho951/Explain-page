import clsx from 'clsx';
import styles from '@/components/atoms/BaseButton/BaseButton.module.css';

/**
 * variant와 size에 따라 버튼에 적용할 클래스를 반환합니다.
 *
 * @param {string} [variant='primary'] - 버튼 스타일 종류(primary, secondary 등)
 * @param {string} [size='md'] - 버튼 크기(sm, md, lg 등)
 * @param {string} [className] - 추가 사용자 정의 클래스
 * @returns {string} 조합된 클래스명
 */
const getButtonClasses = (
  variant: string = 'primary',
  size: string = 'md',
  className?: string,
): string => clsx(styles.button, styles[variant], styles[size], className);

export { getButtonClasses };
