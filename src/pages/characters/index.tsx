import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCharacters } from '../../actions';
import Loading from '../../components/Loading/Loading';
import { getUrlID } from '../../helpers/getUrlID';
import styles from '../../styles/Layout.module.scss';

const Characters: NextPage<{ showPageDetails: Function }> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const characters = useCharacters(setIsLoading);

  useEffect(() => {
    props.showPageDetails({
      isDetails: false,
      pageTitle: 'Postacie'
    });
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <h3>Postacie</h3>
      <ul>
        {characters &&
          characters.map((character, i) => {
            return (
              <li key={getUrlID(character.url)}>
                <Link href={`/characters/${getUrlID(character.url)}`}>{character.name}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Characters;
