import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { request } from "../../api/client";
import ApiFeedback from "../../components/ApiFeedback";
import MovieGrid from "../../components/MovieGrid";
import Navbar from "../../components/Navbar/Navbar";
import useMovieActions from "../../hooks/useMovieActions";
import styles from "./Search.module.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [activeGenre, setActiveGenre] = useState("");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { startWatching, addToWatchlist, likeMovie } = useMovieActions();

  useEffect(() => {
    let active = true;
    request("/movies/genres")
      .then(({ genres: availableGenres }) => {
        if (active) setGenres(availableGenres);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      setLoading(true);
      setError("");
      const query = new URLSearchParams({ limit: "60" });
      if (searchText.trim()) query.set("search", searchText.trim());
      if (activeGenre) query.set("genre", activeGenre);
      if (sort) query.set("sort", sort);

      request(`/movies?${query}`)
        .then((listing) => {
          if (!active) return;
          setMovies(listing.movies);
          setTotal(listing.pagination.total);
        })
        .catch((requestError) => {
          if (active) setError(requestError.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, searchText ? 250 : 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [searchText, activeGenre, sort]);

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />
      <section className={`container-fluid px-4 px-md-5 py-5 ${styles.searchSection}`}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className={styles.searchBox}>
              <i className="bi bi-search" />
              <input
                type="search"
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
                  <i className="bi bi-x-lg" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap mt-4">
          {["", ...genres].map((genre) => (
            <button
              key={genre || "all"}
              type="button"
              className={`btn ${activeGenre === genre ? "btn-light" : "btn-outline-secondary"} rounded-pill px-3`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre || "All"}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-4 fw-semibold mb-0">
              {searchText ? `Results for "${searchText}"` : "Explore Movies & Shows"}
            </h2>
            <div className="d-flex align-items-center gap-3">
              <span className="text-secondary small">{total} titles</span>
              <select
                className="form-select form-select-sm bg-dark text-white border-secondary"
                aria-label="Sort titles"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="">Recently added</option>
                <option value="trending">Trending</option>
                <option value="popular">Popular</option>
                <option value="top-rated">Top rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          <ApiFeedback loading={loading} error={error} />
          {!loading && !error && movies.length === 0 && (
            <p className="text-secondary py-3">No matching movies or shows found.</p>
          )}
          {!loading && !error && (
            <MovieGrid movies={movies} onPlay={startWatching} onAdd={addToWatchlist} onLike={likeMovie} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Search;
