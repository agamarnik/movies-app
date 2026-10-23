import type { Movie, DiscoverResponse, Genre, GenreListResponse } from "./types";

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        throw new Error("TMDB_API_KEY is not defined in the environment variables.");
    }

    const url = new URL(`https://api.themoviedb.org/3${path}`);
    url.searchParams.set("api_key", apiKey);

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`TMDB request failed with status ${res.status}`);
    }

    return res.json();
}

export async function searchMovies(query: string): Promise<Movie[]> {
    const data = await tmdbFetch<DiscoverResponse>("/search/movie", { query });

    return data.results;
}

export async function getMovies(genre: string | null): Promise<Movie[]> { 
    const params: Record<string, string> = { "vote_count.gte": "100" }; // Exclude obscure movies with a few 10/10 votes, which distort rating sorts

    if (genre) {
        params.with_genres = genre;
    }

    const data = await tmdbFetch<DiscoverResponse>("/discover/movie", params);
    return data.results;
}

export async function getGenres(): Promise<Genre[]> {
    const data = await tmdbFetch<GenreListResponse>("/genre/movie/list");
    return data.genres;
}
