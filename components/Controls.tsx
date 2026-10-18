"use client";
import type { SortKey, SortDirection } from "@/lib/types";
import type { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ControlsProps = {
  sort: SortKey;
  dir: SortDirection;
};

const SORT_OPTIONS: { label: string; sort: SortKey; dir: SortDirection }[] = [
    { label: "Rating (high → low)", sort: "rating", dir: "desc" },
    { label: "Rating (low → high)", sort: "rating", dir: "asc" },
    { label: "Release Date (new → old)", sort: "release_date", dir: "desc" },
    { label: "Release Date (old → new)", sort: "release_date", dir: "asc" },
    { label: "Title (A → Z)", sort: "title", dir: "asc" },
    { label: "Title (Z → A)", sort: "title", dir: "desc" },
];

export default function Controls({ sort, dir }: ControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const [newSort, newDir] = e.target.value.split(":");

        const params = new URLSearchParams(searchParams);
        params.set("sort", newSort);
        params.set("dir", newDir);

        router.push(`/?${params.toString()}`, {scroll: false});
    }
    
    return (
        <>
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={`${sort}:${dir}`} onChange={handleChange}>
                {SORT_OPTIONS.map((option) => (
                    <option key={`${option.sort}:${option.dir}`} value={`${option.sort}:${option.dir}`}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
}