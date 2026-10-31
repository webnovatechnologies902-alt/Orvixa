import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { request } from "../../api/client";
import { useAuth } from "../../auth/useAuth";
import ApiFeedback from "../../components/ApiFeedback";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
import useMovieActions from "../../hooks/useMovieActions";
import styles from "./MyList.module.css";

const sections = [
  { id: "watchlist", label: "My List" },
  { id: "likes", label: "Liked" },
  { id: "history", label: "Watch History" },
];

const MyList = () => {
  const [searchParams] = useSearchParams();
  const requestedSection = searchParams.get("section");
  const [activeSection, setActiveSection] = useState(
    sections.some((section) => section.id === requestedSection)
      ? requestedSection
      : "watchlist"
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadedKey, setLoadedKey] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const { isAuthenticated, loading: authLoading, showNotice } = useAuth();
  const { startWatching, addToWatchlist, likeMovie } = useMovieActions();

  const loadKey = `${activeSection}-${activeFilter}`;

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    let active = true;
    const path =
      activeSection === "watchlist"
        ? `/watchlist${activeFilter === "All" ? "" : `?type=${activeFilter === "Movies" ? "movie" : "tv"}`}`
        : activeSection === "likes"
          ? "/likes"
          : "/watch-history";

    request(path)
      .then((data) => {
        if (!active) return;
        setItems(data.items.map((item) => item.movie || item));
        setError("");
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
          setLoadedKey(loadKey);
        }
      });

    return () => {
      active = false;
    };
  }, [activeFilter, activeSection, isAuthenticated, loadKey, reloadCount]);

  const removeItem = async (movie) => {
    const path =
      activeSection === "watchlist"
        ? `/watchlist/${encodeURIComponent(movie.id)}`
        : activeSection === "likes"
          ? `/likes/${encodeURIComponent(movie.id)}`
          : `/watch-history/${encodeURIComponent(movie.id)}`;

    try {
      await request(path, { method: "DELETE" });
      setItems((current) => current.filter((item) => item.id !== movie.id));
      showNotice("Title removed.", "success");
    } catch (requestError) {
      showNotice(requestError.message);
    }
  };

  const clearHistory = async () => {
    try {
      await request("/watch-history", { method: "DELETE" });
      setItems([]);
      showNotice("Watch history cleared.", "success");
    } catch (requestError) {
      showNotice(requestError.message);
    }
  };

  const play = async (movie) => {
    if (await startWatching(movie)) setReloadCount((count) => count + 1);
  };

  if (!authLoading && !isAuthenticated) {
    return (
      <main className="min-vh-100 bg-dark text-white">
        <Navbar />
        <section className="container py-5">
          <h1 className="display-6 fw-bold">My List</h1>
          <p className="text-secondary">Sign in to see your saved titles and watch history.</p>
          <Link to="/login?next=%2Fmy-list" className="btn btn-light">Sign in</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />
      <section className={`container-fluid px-4 px-md-5 ${styles.page}`}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="display-6 fw-bold mb-2">
              {sections.find((section) => section.id === activeSection).label}
            </h1>
            <p className="text-secondary mb-0">
              Saved titles, liked movies and your recent playback activity.
            </p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`btn ${activeSection === section.id ? "btn-light" : "btn-outline-secondary"} rounded-pill px-3`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {activeSection === "watchlist" && (
          <div className="d-flex gap-2 mb-4">
            {["All", "Movies", "TV Shows"].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`btn ${activeFilter === filter ? "btn-light" : "btn-outline-secondary"} rounded-pill px-3`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {activeSection === "history" && items.length > 0 && (
          <button type="button" className="btn btn-outline-danger btn-sm mb-4" onClick={clearHistory}>
            Clear watch history
          </button>
        )}
        {!loading && !error && (
          <div className="text-secondary small mb-4">{items.length} titles</div>
        )}
        <ApiFeedback
          loading={authLoading || loading || (isAuthenticated && loadedKey !== loadKey)}
          error={error}
        />

        {!loading && loadedKey === loadKey && !authLoading && !error && items.length === 0 && (
          <p className="text-secondary py-3">Nothing here yet. Browse the catalog to find a title.</p>
        )}
        {!loading && loadedKey === loadKey && !authLoading && !error && items.length > 0 && (
          <div className="row g-3 g-md-4">
            {items.map((movie) => (
              <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div className={styles.listCard}>
                  <MovieCard
                    movie={movie}
                    onPlay={play}
                    onAdd={addToWatchlist}
                    onLike={likeMovie}
                  />
                  <button
                    type="button"
                    className={`btn btn-dark rounded-circle ${styles.removeButton}`}
                    aria-label={`Remove ${movie.title}`}
                    onClick={() => removeItem(movie)}
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && loadedKey === loadKey && !error && items.length === 0 && activeSection === "watchlist" && (
          <Link to="/movies" className="btn btn-outline-light mt-2">Browse movies</Link>
        )}
      </section>
    </main>
  );
};

export default MyList;
