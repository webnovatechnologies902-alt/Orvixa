import { Link } from "react-router-dom";

import styles from "./MovieCard.module.css";

const MovieCard = ({ movie, onPlay, onAdd, onLike }) => {
  const runAction = (event, action) => {
    event.preventDefault();
    event.stopPropagation();
    action?.(movie);
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/movie/${movie.id}`}
        className={styles.link}
      >
        <img
          src={movie.image}
          alt={movie.title}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.overlay}>
          <h3>{movie.title}</h3>

          <div className={styles.actions}>
            <button
              type="button"
              aria-label={`Play ${movie.title}`}
              onClick={(event) => runAction(event, onPlay)}
            >
              <i className="bi bi-play-fill"></i>
            </button>

            <button
              type="button"
              aria-label={`Add ${movie.title} to My List`}
              onClick={(event) => runAction(event, onAdd)}
            >
              <i className="bi bi-plus-lg"></i>
            </button>

            <button
              type="button"
              aria-label={`Like ${movie.title}`}
              onClick={(event) => runAction(event, onLike)}
            >
              <i className="bi bi-hand-thumbs-up"></i>
            </button>
          </div>

          <div className={styles.info}>
            <span>{movie.year}</span>
            <span>{movie.rating}</span>
            <span>{movie.duration}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;