import { Link } from '@/shared/ui/link';
import type { FnbProps } from './Fnb.types';

import styles from '@/shared/ui/footer/components/Fnb.module.css';

export const Fnb = ({ fnb }: FnbProps) => {
  return fnb.map(ele => (
    <section key={ele.id}>
      <h3 className={styles.fnbTitle}>{ele.label}</h3>
      <ul>
        {ele.children &&
          ele.children.map(link => (
            <li key={link.id}>
              <Link
                className={styles.fnbEle}
                href={link.href}
                target={link.target}
                rel={link.target ? '_blank' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  ));
};
