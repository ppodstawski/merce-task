import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCharacter } from '../../actions';
import Loading from '../../components/Loading/Loading';
import Reviews from '../../components/Reviews/Reviews';
import { getUrlID } from '../../helpers/getUrlID';
import styles from '../../styles/Layout.module.scss';

const Character: NextPage<{ showPageDetails: Function }> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const character = useCharacter(setIsLoading);

  useEffect(() => {
    props.showPageDetails({
      isDetails: true,
      pageTitle: character ? character.name : ''
    });
  }, [character]);

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <h3 className="pageTitle">Postać: {character && character.name}</h3>
      <h4>Podstawowe dane:</h4>
      <p>Wzrost: {character && character.height}</p>
      <p>Masa: {character && character.mass}</p>
      <p>Data urodzenia: {character && character.birth_year}</p>
      <h4>Filmy:</h4>
      <ul>
        {character && character.films.length > 0
          ? character.films.map((filmUrl) => {
              return (
                <li key={getUrlID(filmUrl)}>
                  <Link href={`/movies/${getUrlID(filmUrl)}`}>{`movies/${getUrlID(filmUrl)}`}</Link>
                </li>
              );
            })
          : null}
      </ul>

      {character && <Reviews forItem={character.name} type={'characters'} />}
    </div>
  );
};

export default Character;
