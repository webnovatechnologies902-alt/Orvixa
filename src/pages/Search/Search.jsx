import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import movies from "../../data/movie.js";
import styles from "./Search.module.css";

const genres = [
  "All",
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Sci-Fi",
  "Adventure",
];

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />

      <section className={`container-fluid px-4 px-md-5 py-5 ${styles.searchSection}`}>
        {/* Search Header */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className={styles.searchBox}>
              <i className="bi bi-search"></i>

              <input
                type="text"
                className="form-control"
                placeholder="Search for movies, shows and more..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />

              {searchText && (
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => setSearchText("")}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="d-flex gap-2 flex-wrap mt-4">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`btn ${
                activeGenre === genre
                  ? "btn-light"
                  : "btn-outline-secondary"
              } rounded-pill px-3`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-4 fw-semibold mb-0">
              {searchText
                ? `Results for "${searchText}"`
                : "Explore Movies & Shows"}
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
        </div>
      </section>
    </main>
  );
};

export default Search;