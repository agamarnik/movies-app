import type { Movie, DiscoverResponse } from "./types";

export async function getMovies(genre: string | null): Promise<Movie[]> { 
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        throw new Error("TMDB_API_KEY is not defined in the environment variables.");
    }

    const url = new URL("https://api.themoviedb.org/3/discover/movie");
    url.searchParams.set("api_key", apiKey);

    url.searchParams.set("vote_count.gte", "100"); // Exclude obscure movies with a few 10/10 votes, which distort rating sorts
    
    if (genre) {
        url.searchParams.set("with_genres", genre);
    }

    const res = await fetch(url);

    if (!res.ok) {  
       throw new Error(`TMDB request failed with status ${res.status}`);
    }

    const data: DiscoverResponse = await res.json();
    return data.results;
}