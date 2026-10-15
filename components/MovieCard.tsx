import type { Movie } from "@/lib/types";
import Image from "next/image";

type MovieCardProps = {
    movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
    
    return (
        <article>
            {posterUrl ? <Image src={posterUrl} alt={movie.title} width={500} height={750} /> : <div> No Poster</div> }
            <h2>{movie.title}</h2>
            <p>Vote Average: {movie.vote_average.toFixed(1)}</p>
        </article>
    );
}
