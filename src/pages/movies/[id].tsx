import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMovie } from '../../actions';
import Loading from '../../components/Loading/Loading';
import Reviews from '../../components/Reviews/Reviews';
import { getUrlID } from '../../helpers/getUrlID';
import styles from '../../styles/Layout.module.scss';
import type { Movie } from '../../types';

const Movie: NextPage<{ showPageDetails: Function }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const movie = useMovie(setIsLoading);

  useEffect(() => {
    props.showPageDetails({
      isDetails: true,
      pageTitle: movie ? movie.title : ''
    });
  }, [movie]);

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <h3>Film: {movie && movie.title}</h3>
      <p>{movie && movie.opening_crawl}</p>
      <h4>Postacie:</h4>
      <ul>
        {movie && movie.characters.length > 0
          ? movie.characters.map((characterUrl) => {
              return (
                <li key={getUrlID(characterUrl)}>
                  <Link href={`/characters/${getUrlID(characterUrl)}`}>{`characters/${getUrlID(characterUrl)}`}</Link>
                </li>
              );
            })
          : null}
      </ul>

      {movie && <Reviews forItem={movie.title} type={'movies'} />}
    </div>
  );
};

export default Movie;
