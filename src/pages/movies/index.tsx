import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../../styles/Layout.module.scss';
import { useMovies } from '../../actions';
import { getUrlID } from '../../helpers/getUrlID';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';

const Movies: NextPage<{ showPageDetails: Function }> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const movies = useMovies(setIsLoading);

  useEffect(() => {
    props.showPageDetails({
      isDetails: false,
      pageTitle: 'Filmy'
    });
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <h3>Filmy</h3>
      <ul>
        {movies &&
          movies.map((movie, i) => {
            return (
              <li key={getUrlID(movie.url)}>
                <Link href={`/movies/${getUrlID(movie.url)}`}>{movie.title}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Movies;
