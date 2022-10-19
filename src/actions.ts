import { useRouter } from 'next/router';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import type { Movie, Character } from './types';

async function fetchMethod<T>(resource: string) {
  const cache = window.localStorage;
  const prefix = 'SWAPICache';

  const url = `https://swapi.dev/api/${resource}`;
  const cached = cache.getItem(`${prefix}.${resource}`);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const res = await fetch(url);
    const resJSON = (await res.json()) as T;
    cache.setItem(`${prefix}.${resource}`, JSON.stringify(resJSON));
    return resJSON;
  } catch (error) {
    console.log(error);
  }
}

export const useMovies = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const [response, setResponse] = useState<Movie[] | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    fetchMethod<{ results: Movie[] }>('films').then(({ results }) => {
      setResponse(results);
      setIsLoading(false);
    });
  }, []);

  return response;
};

export const useMovie = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const router = useRouter();
  const [response, setResponse] = useState<Movie | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(true);
      fetchMethod<Movie>(`films/${router.query.id}`).then((response) => {
        setResponse(response);
        setIsLoading(false);
      });
    }
  }, [router]);

  return response;
};

export const useCharacters = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const [response, setResponse] = useState<Character[] | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    fetchMethod<{ results: Character[] }>('people').then(({ results }) => {
      setResponse(results);
      setIsLoading(false);
    });
  }, []);

  return response;
};

export const useCharacter = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const router = useRouter();
  const [response, setResponse] = useState<Character | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(true);
      fetchMethod<Character>(`people/${router.query.id}`).then((response) => {
        setResponse(response);
        setIsLoading(false);
      });
    }
  }, [router]);

  return response;
};
