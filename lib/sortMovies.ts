import { SORT_DIRECTIONS, SORT_KEYS, type Movie, type SortDirection, type SortKey } from "./types";

function compareAscending(a: Movie, b: Movie, key: SortKey): number {
    switch (key) {
        case "rating":
            return a.vote_average - b.vote_average;
        case "release_date":
            return a.release_date.localeCompare(b.release_date);
        case "title":
            return a.title.localeCompare(b.title);
    }
}

export function sortMovies(movies: Movie[], key: SortKey, direction: SortDirection): Movie[] {
    const sign = direction === "asc" ? 1 : -1;
    return movies.toSorted((a, b) => sign * compareAscending(a, b, key));
}

export function isSortKey(value: unknown): value is SortKey {
    return SORT_KEYS.some((key) => key === value);
}

export function isSortDirection(value: unknown): value is SortDirection {
    return SORT_DIRECTIONS.some((dir) => dir === value);
}
