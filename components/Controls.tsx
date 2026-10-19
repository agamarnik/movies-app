"use client";
import type { SortKey, SortDirection, Genre } from "@/lib/types";
import { type ChangeEvent, useTransition, useOptimistic } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Controls.module.css";

type ControlsProps = {
  sort: SortKey;
  dir: SortDirection;
  genre: string | null;
  genres: Genre[];
};

const SORT_OPTIONS: { label: string; sort: SortKey; dir: SortDirection }[] = [
    { label: "Rating (high → low)", sort: "rating", dir: "desc" },
    { label: "Rating (low → high)", sort: "rating", dir: "asc" },
    { label: "Release Date (new → old)", sort: "release_date", dir: "desc" },
    { label: "Release Date (old → new)", sort: "release_date", dir: "asc" },
    { label: "Title (A → Z)", sort: "title", dir: "asc" },
    { label: "Title (Z → A)", sort: "title", dir: "desc" },
];

export default function Controls({ sort, dir, genre, genres }: ControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const currentSort = `${sort}:${dir}`;
    const [optimisticSort, setOptimisticSort] = useOptimistic(currentSort);
    const [optimisticGenre, setOptimisticGenre] = useOptimistic(genre ?? "");

    function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        const [newSort, newDir] = value.split(":");

        const params = new URLSearchParams(searchParams);
        params.set("sort", newSort);
        params.set("dir", newDir);

        startTransition(() => {
            setOptimisticSort(value);
            router.push(`/?${params.toString()}`, { scroll: false });
        });
    }

    function handleGenreChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (value === "") {
            params.delete("genre");
        } else {
            params.set("genre", value);
        }

        startTransition(() => {
            setOptimisticGenre(value);
            router.push(`/?${params.toString()}`, { scroll: false });
        });
    }
    
    return (
        <div className={styles.controls}>
            <label htmlFor="genre">Genre</label>
            <select id="genre" value={optimisticGenre} onChange={handleGenreChange}>
                <option value="">All genres</option>
                {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </select>
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={optimisticSort} onChange={handleSortChange}>
                {SORT_OPTIONS.map((option) => (
                    <option key={`${option.sort}:${option.dir}`} value={`${option.sort}:${option.dir}`}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span aria-live="polite">{isPending ? "Updating…" : ""}</span>
        </div>
    );
}