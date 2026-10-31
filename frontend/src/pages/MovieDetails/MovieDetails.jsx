import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getMoviePath, request } from "../../api/client";
import { useAuth } from "../../auth/useAuth";
import ApiFeedback from "../../components/ApiFeedback";
import Navbar from "../../components/Navbar/Navbar";
import useMovieActions from "../../hooks/useMovieActions";
import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, showNotice } = useAuth();
  const navigate = useNavigate();
  const { startWatching, addToWatchlist } = useMovieActions();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadedId, setLoadedId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    request(getMoviePath(id))
      .then(({ movie: result }) => {
        if (active) {
          setMovie(result);
          setError("");
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) {
          setLoadedId(id);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const toggleLike = async () => {
    if (!isAuthenticated) {
      showNotice("Sign in to like titles.", "warning");
      navigate("/login");
      return;
    }

    try {
      await request(`/likes/${encodeURIComponent(movie.id)}`, { method: "PUT" });
      showNotice(`You liked ${movie.title}.`, "success");
    } catch (requestError) {
      showNotice(requestError.message);
    }
  };

  return (
    <main className={styles.detailsPage}>
      <Navbar />
      <ApiFeedback loading={loading || loadedId !== id} error={error} />

      {!loading && loadedId === id && !error && !movie && (
        <div className="container text-white pt-5">
          <h2>Movie or show not found</h2>
          <Link to="/" className="btn btn-light mt-3">Back to Home</Link>
        </div>
      )}

      {movie && loadedId === id && !error && (
        <section
          className={styles.hero}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,.95), rgba(0,0,0,.65), rgba(0,0,0,.2)), url("${movie.backdrop || movie.image}")`,
          }}
        >
          <div className="container-fluid px-4 px-md-5">
            <div className={styles.content}>
              <span className={styles.label}>
                {movie.type === "tv" ? "ORVIXA SERIES" : "ORVIXA FILM"}
              </span>
              <h1 className={styles.title}>{movie.title}</h1>
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <span>{movie.year}</span>
                <span className="border px-2 py-1">{movie.rating}</span>
                <span>{movie.seasons ? `${movie.seasons} Seasons` : movie.duration}</span>
                <span>HD</span>
                {movie.averageRating > 0 && <span>{movie.averageRating.toFixed(1)} / 10</span>}
              </div>
              <p className={styles.description}>{movie.description || "Details for this title are not available yet."}</p>
              {movie.genres?.length > 0 && (
                <p className="text-secondary">{movie.genres.join(" · ")}</p>
              )}
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-light px-4" onClick={() => startWatching(movie)}>
                  <i className="bi bi-play-fill me-2" /> Play
                </button>
                <button className="btn btn-secondary px-4" onClick={() => addToWatchlist(movie)}>
                  <i className="bi bi-plus-lg me-2" /> My List
                </button>
                <button className="btn btn-outline-light px-4" onClick={toggleLike}>
                  <i className="bi bi-hand-thumbs-up me-2" /> Like
                </button>
              </div>
              <Link to="/" className="btn btn-outline-light mt-4">
                <i className="bi bi-arrow-left me-2" /> Back to Home
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default MovieDetails;
