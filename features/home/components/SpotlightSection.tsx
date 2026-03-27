import { Image } from '@/shared/ui/Image';
import styles from './SpotlightSection.module.css';

const spotlights = [
  {
    img: '/images/developer.png',
    title: '서비스 소개 문구를 더 설득력 있게 정리하기',
    desc: '첫 문장에서 무엇을 하는 서비스인지 명확히 보이도록 헤드라인과 보조 문장을 정리합니다.',
    date: 'Landing guide',
  },
  {
    img: '/images/algorithm.png',
    title: '회의 메모를 팀 공유용 문서로 재구성하기',
    desc: '결정 사항, 해야 할 일, 참고 내용을 분리해 한 번에 읽히는 정리 문서로 바꿉니다.',
    date: 'Workflow tip',
  },
  {
    img: '/images/sample.png',
    title: '블로그 초안을 게시 가능한 문장으로 다듬기',
    desc: '반복 표현을 줄이고 핵심만 남겨 독자가 빠르게 따라갈 수 있는 문장 흐름을 만듭니다.',
    date: 'Editing example',
  },
];

export default function SpotlightSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>USEFUL EXAMPLES</p>
          <h2 className={styles.title}>서비스 활용 장면을 바로 떠올리게 하는 예시</h2>
        </div>
        <div className={styles.cardSlider}>
          {spotlights.map(item => (
            <article key={item.title} className={styles.spotlightCard}>
              <Image
                src={item.img}
                className={styles.cardImg}
                alt={item.desc}
                aspectRatio="16/10"
              />
              <span className={styles.cardMeta}>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
