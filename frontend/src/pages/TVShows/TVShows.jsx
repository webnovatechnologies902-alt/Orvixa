import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { request } from "../../api/client";
import ApiFeedback from "../../components/ApiFeedback";
import MovieGrid from "../../components/MovieGrid";
import Navbar from "../../components/Navbar/Navbar";
import useMovieActions from "../../hooks/useMovieActions";
import styles from "./TVShows.module.css";

const TVShows = () => {
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [collections, setCollections] = useState(null);
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedGenre, setLoadedGenre] = useState(null);
  const [error, setError] = useState("");
  const { startWatching, addToWatchlist, likeMovie } = useMovieActions();

  useEffect(() => {
    let active = true;
    request("/movies/genres?type=tv")
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
    const query = new URLSearchParams({ type: "tv", limit: "60" });
    if (genre) query.set("genre", genre);

    Promise.all([
      request(`/movies?${query}`),
      request("/movies/home?type=tv"),
    ])
      .then(([listing, homeCollections]) => {
        if (!active) return;
        setMovies(listing.movies);
        setTotal(listing.pagination.total);
        setCollections(homeCollections);
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

  const featured = collections?.featured;
  const renderCollection = (title, items) => (
    <section className="mb-5" key={title}>
      <h2 className="fs-4 fw-semibold mb-4">{title}</h2>
      {items.length > 0 ? (
        <MovieGrid movies={items} onPlay={startWatching} onAdd={addToWatchlist} onLike={likeMovie} />
      ) : (
        <p className="text-secondary">No shows in this collection yet.</p>
      )}
    </section>
  );

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />
      <section className={`container-fluid px-4 px-md-5 ${styles.page}`}>
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">TV Shows</h1>
          <p className="text-secondary mb-0">Explore series, originals and binge-worthy shows.</p>
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
                <span className="badge bg-danger mb-3">ORVIXA ORIGINAL</span>
                <h2 className="display-5 fw-bold mb-3">{featured.title}</h2>
                <div className="d-flex gap-3 text-light mb-3 flex-wrap">
                  <span>{featured.year}</span><span>{featured.rating}</span>
                  <span>{featured.seasons ? `${featured.seasons} Seasons` : featured.duration}</span><span>HD</span>
                </div>
                <p className="text-light opacity-75 mb-4">{featured.description}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-light px-4" onClick={() => startWatching(featured)}>
                    <i className="bi bi-play-fill me-1" /> Play
                  </button>
                  <Link to={`/movie/${featured.id}`} className="btn btn-secondary px-4">
                    <i className="bi bi-info-circle me-1" /> More Info
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-semibold mb-0">{genre ? `${genre} Shows` : "All TV Shows"}</h2>
          <span className="text-secondary small">{total} titles</span>
        </div>
        <ApiFeedback loading={loading || loadedGenre !== genre} error={error} />
        {!loading && loadedGenre === genre && !error && movies.length === 0 && (
          <p className="text-secondary py-3">No shows found for this category.</p>
        )}
        {!loading && loadedGenre === genre && !error && (
          <MovieGrid movies={movies} onPlay={startWatching} onAdd={addToWatchlist} onLike={likeMovie} />
        )}

        {collections &&
          renderCollection("Popular TV Shows", collections.popular)}
        {collections &&
          renderCollection("Trending Shows", collections.trending)}
        {collections &&
          renderCollection("Top Rated Series", collections.topRated)}
      </section>
    </main>
  );
};

export default TVShows;
