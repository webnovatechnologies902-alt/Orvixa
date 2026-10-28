import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import movies from "../../data/movie.js";
import styles from "./Movies.module.css";

const categories = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Thriller",
  "Sci-Fi",
];

const Movies = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />

      <section className={`container-fluid px-4 px-md-5 ${styles.page}`}>
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">Movies</h1>

          <p className="text-secondary mb-0">
            Discover your next favorite movie.
          </p>
        </div>

        {/* Categories */}
        <div className="d-flex gap-2 flex-wrap mb-5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`btn ${
                activeCategory === category
                  ? "btn-light"
                  : "btn-outline-secondary"
              } rounded-pill px-3`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Movie */}
        <section className={`position-relative overflow-hidden rounded-3 mb-5 ${styles.featured}`}>
          <img
            src={movies[0].image}
            alt={movies[0].title}
            className={styles.featuredImage}
          />

          <div className={styles.featuredOverlay}>
            <div className="p-4 p-md-5 col-12 col-md-7">
              <span className="badge bg-danger mb-3">
                FEATURED MOVIE
              </span>

              <h2 className="display-5 fw-bold mb-3">
                {movies[0].title}
              </h2>

              <div className="d-flex gap-3 text-light mb-3">
                <span>{movies[0].year}</span>
                <span>{movies[0].rating}</span>
                <span>{movies[0].duration}</span>
                <span>HD</span>
              </div>

              <p className="text-light opacity-75 mb-4">
                Experience an unforgettable story filled with action,
                suspense and extraordinary characters.
              </p>

              <button className="btn btn-light px-4">
                <i className="bi bi-play-fill me-1"></i>
                Play
              </button>
            </div>
          </div>
        </section>

        {/* Movie Grid */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-semibold mb-0">
            {activeCategory === "All"
              ? "All Movies"
              : `${activeCategory} Movies`}
          </h2>

          <span className="text-secondary small">
            {movies.length} titles
          </span>
        </div>

        <div className="row g-3 g-md-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Movies;