import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../styles/Layout.module.scss';

const Home: NextPage<{ showPageDetails: Function }> = (props) => {
  useEffect(() => {
    props.showPageDetails({
      isDetails: false,
      pageTitle: 'Strona główna'
    });
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.mainMenu}>
        <li>
          <Link href="/movies">Filmy</Link>
        </li>
        <li>
          <Link href="/characters">Postacie</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
