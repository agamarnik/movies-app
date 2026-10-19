import MovieCard from "@/components/MovieCard";
import { getGenres, getMovies } from "@/lib/tmdb";
import styles from "./page.module.css";
import { isSortKey, isSortDirection, sortMovies } from "@/lib/sortMovies";
import { DEFAULT_SORT, DEFAULT_DIR } from "@/lib/types";
import Controls from "@/components/Controls";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams; // Next 16 passes searchParams as a Promise
  const genre = typeof params.genre === "string" ? params.genre : null;
  const sort = isSortKey(params.sort) ? params.sort : DEFAULT_SORT;
  const dir = isSortDirection(params.dir) ? params.dir : DEFAULT_DIR;

  const [movies, genres] = await Promise.all([
    getMovies(genre),
    getGenres().catch((error) => { console.error(error); return []; }),
  ]);

  const sortedMovies = sortMovies(movies, sort, dir);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Movies</h1>
      <Controls sort={sort} dir={dir} />
      {sortedMovies.length > 0 ? (
        <div className={styles.grid}>
          {sortedMovies.map((movie, index) => ( 
            <MovieCard key={movie.id} movie={movie} eager={index < 6} />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No movies found. Try a different genre.</p>
      )}
      </main>
  )
}