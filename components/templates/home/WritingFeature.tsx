import { Flicking } from '@/components/molecules/Flicking';
import ImageCard from '@/components/molecules/ImageCard/ImageCard';
import styles from './WritingFeature.module.css';

export default function WritingFeature({ posts }: WritingFeatureProps) {
  return (
    <section className={styles.featureOverflowRight}>
      <Flicking autoSlideInterval={3500} arrowVisibility="none">
        {posts.map(list => (
          <ImageCard
            className={styles.imageCard}
            key={list.id}
            imageSrc={list.imageSrc}
            alt={list.alt}
            title={list.title}
            description={list.description}
          >
            <span className={styles.date}>{list.date}</span>
          </ImageCard>
        ))}
      </Flicking>
    </section>
  );
}

type WritingFeatureProps = {
  posts: Post[];
};

export type Post = {
  id: string;
  imageSrc: string;
  alt: string;
  title: string;
  description?: string;
  date?: string;
};
