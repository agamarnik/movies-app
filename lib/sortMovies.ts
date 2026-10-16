import type { Movie, SortDirection, SortKey } from "./types";

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
