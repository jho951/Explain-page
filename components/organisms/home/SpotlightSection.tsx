import { Image } from '@/components/atoms/Image';
import styles from './SpotlightSection.module.css';

const spotlights = [
  {
    img: '/images/developer.png',
    title: 'Introduce the architecture before the feature',
    desc: '기능 설명보다 먼저 구조와 경계를 보여주는 방식으로 프로젝트를 설명합니다.',
    date: 'Architecture note',
  },
  {
    img: '/images/algorithm.png',
    title: 'Observe bottlenecks with explicit logging points',
    desc: '복잡한 장애를 빨리 수렴시키기 위해 어떤 이벤트를 남겨야 하는지 정리합니다.',
    date: 'Observability guide',
  },
  {
    img: '/images/sample.png',
    title: 'Make documentation part of implementation',
    desc: '결정 사항과 트레이드오프를 코드 밖에서도 추적할 수 있게 문서를 같이 설계합니다.',
    date: 'Engineering writing',
  },
];

export default function SpotlightSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>SPOTLIGHT</p>
          <h2 className={styles.title}>읽기 흐름을 잡아주는 대표 콘텐츠</h2>
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
