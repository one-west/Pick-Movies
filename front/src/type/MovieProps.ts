export interface MovieProps {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
  tagline: string;
}

export interface MovietrailerProps {
  "id": number;
  "results": [
    {
      "id": string,
      "iso_639_1": string,
      "iso_3166_1": string,
      "key": string,
      "name": string,
      "site": string,
      "size": number,
      "type": string
    }
  ];
}
