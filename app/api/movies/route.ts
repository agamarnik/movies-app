import type { NextRequest } from "next/server";
import { getMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {

    const genre = request.nextUrl.searchParams.get("genre"); // string | null

    try {
        const movies = await getMovies(genre);
        return Response.json(movies);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Failed to fetch movies." }, { status: 502 });
    }
}