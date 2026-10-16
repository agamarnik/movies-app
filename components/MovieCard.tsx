import type { Movie } from "@/lib/types";
import Image from "next/image";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
    movie: Movie;
    eager?: boolean; // load immediately (first row, above the fold)
};

export default function MovieCard({ movie, eager }: MovieCardProps) {
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

    return (
        <article className={styles.card}>
            {posterUrl ? ( 
                <Image src={posterUrl} alt={movie.title} width={500} height={750} className={styles.poster} loading={eager ? "eager" : "lazy"} /> 
            ) : (
                <div className={styles.noPoster}>No Poster</div> 
            )}
            <div className={styles.info}>
                <h2>{movie.title}</h2>
                <p>Vote Average: {movie.vote_average.toFixed(1)}</p>
            </div>
        </article>
    );
}
