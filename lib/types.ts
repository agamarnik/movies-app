export type Movie = {
    id: number;
    title: string;
    poster_path: string | null; // may be missing
    release_date: string;
    vote_average: number;
}

export type DiscoverResponse = {
    results: Movie[];
}

export type SortKey = "rating" | "release_date" | "title";
export type SortDirection = "asc" | "desc";