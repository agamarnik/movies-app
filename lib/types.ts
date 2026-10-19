export type Movie = {
    id: number;
    title: string;
    poster_path: string | null; // may be missing
    release_date: string;
    vote_average: number;
}

export type Genre = {
    id: number;
    name: string;
}

export type DiscoverResponse = {
    results: Movie[];
}

export type GenreListResponse = {
  genres: Genre[];
};

export const SORT_KEYS = ["rating", "release_date", "title"] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export const SORT_DIRECTIONS = ["asc", "desc"] as const;
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

export const DEFAULT_SORT: SortKey = "rating";
export const DEFAULT_DIR: SortDirection = "desc";
