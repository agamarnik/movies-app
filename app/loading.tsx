import styles from "./loading.module.css";
import pageStyles from "./page.module.css";

export default function Loading() {
    return (
        <main className={pageStyles.main}>
        <h1 className={pageStyles.title}>Movies</h1>
            <div className={pageStyles.grid} aria-busy="true" aria-label="Loading movies">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div className={styles.skeletonCard} key={index}>
                        <div key={index} className={styles.skeletonPoster} />
                        <div className={styles.skeletonText} />
                    </div>
                ))}
            </div>
            
        </main>
    );
}