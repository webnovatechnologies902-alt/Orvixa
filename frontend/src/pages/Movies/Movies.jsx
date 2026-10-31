import { useEffect, useState } from "react";

import { request } from "../../api/client";
import ApiFeedback from "../../components/ApiFeedback";
import MovieGrid from "../../components/MovieGrid";
import Navbar from "../../components/Navbar/Navbar";
import useMovieActions from "../../hooks/useMovieActions";
import styles from "./Movies.module.css";

const Movies = () => {
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedGenre, setLoadedGenre] = useState(null);
  const [error, setError] = useState("");
  const { startWatching, addToWatchlist, likeMovie } = useMovieActions();

  useEffect(() => {
    let active = true;
    request("/movies/genres?type=movie")
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
    const query = new URLSearchParams({ type: "movie", limit: "60" });
    if (genre) query.set("genre", genre);

    Promise.all([
      request(`/movies?${query}`),
      request("/movies/home?type=movie"),
    ])
      .then(([listing, collections]) => {
        if (!active) return;
        setMovies(listing.movies);
        setTotal(listing.pagination.total);
        setFeatured(collections.featured);
        setError("");
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
          setLoadedGenre(genre);
        }
      });

    return () => {
      active = false;
    };
  }, [genre]);

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />
      <section className={`container-fluid px-4 px-md-5 ${styles.page}`}>
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">Movies</h1>
          <p className="text-secondary mb-0">Discover your next favorite movie.</p>
        </div>

        <div className="d-flex gap-2 flex-wrap mb-5">
          {["", ...genres].map((item) => (
            <button
              key={item || "all"}
              type="button"
              className={`btn ${genre === item ? "btn-light" : "btn-outline-secondary"} rounded-pill px-3`}
              onClick={() => setGenre(item)}
            >
              {item || "All"}
            </button>
          ))}
        </div>

        {featured && (
          <section className={`position-relative overflow-hidden rounded-3 mb-5 ${styles.featured}`}>
            <img src={featured.backdrop || featured.image} alt={featured.title} className={styles.featuredImage} />
            <div className={styles.featuredOverlay}>
              <div className="p-4 p-md-5 col-12 col-md-7">
                <span className="badge bg-danger mb-3">FEATURED MOVIE</span>
                <h2 className="display-5 fw-bold mb-3">{featured.title}</h2>
                <div className="d-flex gap-3 text-light mb-3">
                  <span>{featured.year}</span><span>{featured.rating}</span>
                  <span>{featured.duration}</span><span>HD</span>
                </div>
                <p className="text-light opacity-75 mb-4">{featured.description}</p>
                <button className="btn btn-light px-4" onClick={() => startWatching(featured)}>
                  <i className="bi bi-play-fill me-1" /> Play
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-semibold mb-0">{genre ? `${genre} Movies` : "All Movies"}</h2>
          <span className="text-secondary small">{total} titles</span>
        </div>
        <ApiFeedback loading={loading || loadedGenre !== genre} error={error} />
        {!loading && loadedGenre === genre && !error && movies.length === 0 && (
          <p className="text-secondary py-3">No movies found for this category.</p>
        )}
        {!loading && loadedGenre === genre && !error && (
          <MovieGrid movies={movies} onPlay={startWatching} onAdd={addToWatchlist} onLike={likeMovie} />
        )}
      </section>
    </main>
  );
};

export default Movies;
