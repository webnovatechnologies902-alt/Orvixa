import { useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieRow.module.css";

const MovieRow = ({ title, movies, onPlay, onAdd, onLike }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (!rowRef.current) return;

    const scrollAmount = 800;

    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.row}>
      <h2>{title}</h2>

      <div className={styles.container}>
        <button
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={() => scroll("left")}
          aria-label={`Scroll ${title} left`}
        >
          ‹
        </button>

        <div className={styles.movieList} ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlay={onPlay}
              onAdd={onAdd}
              onLike={onLike}
            />
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={() => scroll("right")}
          aria-label={`Scroll ${title} right`}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default MovieRow;