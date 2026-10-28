import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import movies from "../../data/movie.js"
import styles from "./TVShows.module.css";

const categories = [
  "All",
  "Drama",
  "Comedy",
  "Crime",
  "Thriller",
  "Sci-Fi",
  "Documentary",
];

const TVShows = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />

      <section className={`container-fluid px-4 px-md-5 ${styles.page}`}>
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">TV Shows</h1>

          <p className="text-secondary mb-0">
            Explore series, originals and binge-worthy shows.
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

        {/* Featured Show */}
        <section
          className={`position-relative overflow-hidden rounded-3 mb-5 ${styles.featured}`}
        >
          <img
            src={movies[2].image}
            alt={movies[2].title}
            className={styles.featuredImage}
          />

          <div className={styles.featuredOverlay}>
            <div className="p-4 p-md-5 col-12 col-md-7">
              <span className="badge bg-danger mb-3">
                ORVIXA ORIGINAL
              </span>

              <h2 className="display-5 fw-bold mb-3">
                Stranger Things
              </h2>

              <div className="d-flex gap-3 text-light mb-3 flex-wrap">
                <span>2025</span>
                <span>16+</span>
                <span>5 Seasons</span>
                <span>HD</span>
              </div>

              <p className="text-light opacity-75 mb-4">
                A mysterious town, strange events and a group of friends
                uncovering secrets that should have remained hidden.
              </p>

              <div className="d-flex gap-2">
                <button className="btn btn-light px-4">
                  <i className="bi bi-play-fill me-1"></i>
                  Play
                </button>

                <button className="btn btn-secondary px-4">
                  <i className="bi bi-info-circle me-1"></i>
                  More Info
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular */}
        <section className="mb-5">
          <h2 className="fs-4 fw-semibold mb-4">
            Popular TV Shows
          </h2>

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

        {/* Trending */}
        <section className="mb-5">
          <h2 className="fs-4 fw-semibold mb-4">
            Trending Shows
          </h2>

          <div className="row g-3 g-md-4">
            {movies
              .slice()
              .reverse()
              .map((movie) => (
                <div
                  key={movie.id}
                  className="col-6 col-sm-4 col-md-3 col-lg-2"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <h2 className="fs-4 fw-semibold mb-4">
            Top Rated Series
          </h2>

          <div className="row g-3 g-md-4">
            {movies.slice(1, 5).map((movie) => (
              <div
                key={movie.id}
                className="col-6 col-sm-4 col-md-3 col-lg-2"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default TVShows;