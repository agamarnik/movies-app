import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        return Response.json({ error: "TMDB_API_KEY is not defined in the environment variables." }, { status: 500 });
    }

    const genre = request.nextUrl.searchParams.get("genre"); // string | null
    const url = new URL("https://api.themoviedb.org/3/discover/movie");
    url.searchParams.set("api_key", apiKey);

    url.searchParams.set("vote_count.gte", "100"); // Exclude obscure movies with a few 10/10 votes, which distort rating sorts
    
    if (genre) {
        url.searchParams.set("with_genres", genre); // Use the genre from the query parameter if provided
    }

    const res = await fetch(url);

    if (!res.ok) {  
       return Response.json({ error: `TMDB request failed with status ${res.status}` }, { status: 502 }); 
    }

    const data = await res.json();
    return Response.json(data); 
}