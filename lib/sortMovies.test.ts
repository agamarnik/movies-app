import { describe, it, expect } from "vitest";
import type { Movie } from "./types";
import { sortMovies, isSortKey, isSortDirection } from "./sortMovies";


function makeMovie(overrides: Partial<Movie> = {}): Movie {
    return {
        id: 1,
        title: "Untitled",
        poster_path: null,
        release_date: "2000-01-01",
        vote_average: 5.0,
        ...overrides,
    };
}

describe("sortMovies", () => {
    const movies = [
        makeMovie({ id: 1, title: "Alien", vote_average: 8.5, release_date: "1979-05-25" }),
        makeMovie({ id: 2, title: "The Godfather", vote_average: 9.2, release_date: "1972-03-15" }),
        makeMovie({ id: 3, title: "Casablanca", vote_average: 8.2, release_date: "1942-01-01" }),
    ];

    it("sorts by rating ascending", () => {
        const result = sortMovies(movies, "rating", "asc");
        expect(result.map((m) => m.title)).toEqual(["Casablanca", "Alien", "The Godfather"]);
    });

    it("sorts by title descending", () => {
        const result = sortMovies(movies, "title", "desc");
        expect(result.map((m) => m.title)).toEqual(["The Godfather", "Casablanca", "Alien"]);
    });

    it("sorts by release date ascending", () => {
        const result = sortMovies(movies, "release_date", "asc");
        expect(result.map((m) => m.title)).toEqual(["Casablanca", "The Godfather", "Alien"]);
    });

    it("doesn't mutate the original array", () => {
        sortMovies(movies, "rating", "asc");
        const after = movies.map((m) => m.title);
        expect(after).toEqual(["Alien", "The Godfather", "Casablanca"]);
    });
});

describe("isSortKey", () => {
    it("accepts a valid sort key", () => {
        expect(isSortKey("rating")).toBe(true);
        expect(isSortKey("release_date")).toBe(true);
        expect(isSortKey("title")).toBe(true);
    });
    
    it("rejects an invalid sort key", () => {
        expect(isSortKey("banana")).toBe(false);
        expect(isSortKey(undefined)).toBe(false);
        expect(isSortKey(["rating", "title"])).toBe(false);
        expect(isSortKey("Rating")).toBe(false);
    });
});  

describe("isSortDirection", () => {
    it("accepts a valid sort direction", () => {
        expect(isSortDirection("asc")).toBe(true);
        expect(isSortDirection("desc")).toBe(true);
    });

    it("rejects an invalid sort direction", () => {
        expect(isSortDirection(undefined)).toBe(false);
        expect(isSortDirection("Ascending")).toBe(false);
    });
});
