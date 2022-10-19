export type Breadcrumb = {
  href: string;
  label: string;
  isCurrent: boolean;
};

export type PageDetails = { isDetails: boolean; pageTitle: string };

export type Movie = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  characters: string[];
  url: string;
};

export type Character = {
  name: string;
  height: number;
  mass: string;
  birth_year: string;
  films: string[];
  url: string;
};
