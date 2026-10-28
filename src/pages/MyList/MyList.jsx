import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import movies from "../../data/movie.js";
import styles from "./MyList.module.css";

const filters = ["All", "Movies", "TV Shows"];

const MyList = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />

      <section className={`container-fluid px-4 px-md-5 ${styles.page}`}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="display-6 fw-bold mb-2">My List</h1>

            <p className="text-secondary mb-0">
              Movies and shows you've added to your list.
            </p>
          </div>

          {/* Filters */}
          <div className="d-flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`btn ${
                  activeFilter === filter
                    ? "btn-light"
                    : "btn-outline-secondary"
                } rounded-pill px-3`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="text-secondary small mb-4">
          {movies.length} titles in your list
        </div>

        {/* Movie Grid */}
        <div className="row g-3 g-md-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <div className={styles.listCard}>
                <MovieCard movie={movie} />

                {/* Remove button */}
                <button
                  type="button"
                  className={`btn btn-dark rounded-circle ${styles.removeButton}`}
                  aria-label={`Remove ${movie.title}`}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MyList;