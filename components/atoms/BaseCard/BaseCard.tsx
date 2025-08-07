import { forwardRef } from 'react';
import clsx from 'clsx';
import { BaseCardComponent, BaseCardProps, createCardSection } from '@/components/atoms/BaseCard';
import styles from '@/components/atoms/BaseCard/BaseCard.module.css';

/**
 * BaseCard.Header
 *
 * 카드의 헤더(타이틀, 서브 타이틀 등)를 렌더링하는 slot 컴포넌트입니다.
 * - 내부적으로 div로 렌더링되며, .header 스타일이 적용됩니다.
 * - 보통 카드의 최상단에 위치
 *
 * @example
 * <BaseCard>
 *   <BaseCard.Header>카드 헤더</BaseCard.Header>
 *   ...
 * </BaseCard>
 */
const BaseCardHeader = createCardSection('Header');

/**
 * BaseCard.Body
 *
 * 카드의 메인 콘텐츠(본문, 설명 등)를 렌더링하는 slot 컴포넌트입니다.
 * - 내부적으로 div로 렌더링되며, .body 스타일이 적용됩니다.
 *
 * @example
 * <BaseCard>
 *   <BaseCard.Body>카드 본문</BaseCard.Body>
 * </BaseCard>
 */
const BaseCardBody = createCardSection('Body');

/**
 * BaseCard.Footer
 *
 * 카드의 하단 영역(액션 버튼, 보조 정보 등)을 렌더링하는 slot 컴포넌트입니다.
 * - 내부적으로 div로 렌더링되며, .footer 스타일이 적용됩니다.
 *
 * @example
 * <BaseCard>
 *   <BaseCard.Footer>카드 푸터</BaseCard.Footer>
 * </BaseCard>
 */
const BaseCardFooter = createCardSection('Footer');

/**
 * BaseCard
 *
 * 헤더, 바디, 푸터 slot을 조합해서 카드 UI를 만들 수 있는 범용 컴포넌트입니다.
 * - 항상 적용되는 base 스타일(styles.card)
 * - forwardRef 지원
 * - className 및 기타 HTML 속성 지원
 * - Header/Body/Footer slot 컴포넌트와 함께 사용
 *
 * @param {BaseCardProps} props - 카드의 속성(props)
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {React.ReactNode} [props.children] - 카드에 렌더링할 slot/콘텐츠
 * @param {React.Ref} [ref] - article 요소에 대한 ref
 *
 * @module BaseCard
 * @example
 * <BaseCard className="shadow-lg">
 *   <BaseCard.Header>카드 헤더</BaseCard.Header>
 *   <BaseCard.Body>본문</BaseCard.Body>
 *   <BaseCard.Footer>푸터</BaseCard.Footer>
 * </BaseCard>
 */
const BaseCard = forwardRef<HTMLElement, BaseCardProps>(function BaseCard(
  { className, children, ...rest },
  ref,
) {
  return (
    <article ref={ref} className={clsx(styles.card, className)} {...rest}>
      {children}
    </article>
  );
}) as BaseCardComponent;

// 정적 Slot 컴포넌트 할당
BaseCard.Header = BaseCardHeader;
BaseCard.Body = BaseCardBody;
BaseCard.Footer = BaseCardFooter;

// displayName 등록 (디버깅 및 Storybook 가독성)
BaseCardHeader.displayName = 'BaseCard.Header';
BaseCardBody.displayName = 'BaseCard.Body';
BaseCardFooter.displayName = 'BaseCard.Footer';
BaseCard.displayName = 'BaseCard';

export { BaseCard, BaseCardHeader, BaseCardBody, BaseCardFooter };
