"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

type ErrorPageProps = {
    error: Error & { digest?: string };
    retry: () => void;
};

export default function ErrorPage({error, retry }: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={styles.main}>
            <h1>{"Couldn't load movies"}</h1>
            <button onClick={() => retry()}>Try again</button>
        </div>
    );
}