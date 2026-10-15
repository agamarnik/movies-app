import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/lib/tmdb";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams; // Next 16 passes searchParams as a Promise
  const genre = typeof params.genre === "string" ? params.genre : null;

  const movies = await getMovies(genre);

  return (
    <div>
      {movies.map((movie) => ( 
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}