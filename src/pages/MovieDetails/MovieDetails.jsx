import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import movies from "../../data/movie.js";

import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
  const { id } = useParams();

  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  if (!movie) {
    return (
      <>
        <Navbar />

        <div className="container text-white pt-5">
          <h2>Movie not found</h2>

          <Link to="/" className="btn btn-light mt-3">
            Back to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <main className={styles.detailsPage}>
      <Navbar />

      <section
        className={styles.hero}
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.95),
              rgba(0, 0, 0, 0.65),
              rgba(0, 0, 0, 0.2)
            ),
            url(${movie.image})
          `,
        }}
      >
        <div className="container-fluid px-4 px-md-5">
          <div className={styles.content}>

            <span className={styles.label}>
              ORVIXA FILM
            </span>

            <h1 className={styles.title}>
              {movie.title}
            </h1>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              <span>{movie.year}</span>

              <span className="border px-2 py-1">
                {movie.rating}
              </span>

              <span>{movie.duration}</span>

              <span>HD</span>
            </div>

            <p className={styles.description}>
              Experience {movie.title}, an exciting story
              filled with unforgettable characters,
              suspense and adventure.
            </p>

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-light px-4">
                <i className="bi bi-play-fill me-2"></i>
                Play
              </button>

              <button className="btn btn-secondary px-4">
                <i className="bi bi-plus-lg me-2"></i>
                My List
              </button>
            </div>

            <Link
              to="/"
              className="btn btn-outline-light mt-4"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Home
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;