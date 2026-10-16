import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/lib/tmdb";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams; // Next 16 passes searchParams as a Promise
  const genre = typeof params.genre === "string" ? params.genre : null;

  const movies = await getMovies(genre);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Movies</h1>
      <div className={styles.grid}>
        {movies.map((movie, index) => ( 
          <MovieCard key={movie.id} movie={movie} eager={index < 6} />
        ))}
      </div>
    </main>
  )
}