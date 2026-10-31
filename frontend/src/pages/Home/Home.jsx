import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { request } from "../../api/client";
import { useAuth } from "../../auth/useAuth";
import ApiFeedback from "../../components/ApiFeedback";
import ContinueWatching from "../../components/ContinueWatching/ContinueWatching";
import MovieRow from "../../components/MovieRow/MovieRow";
import Navbar from "../../components/Navbar/Navbar";
import useMovieActions from "../../hooks/useMovieActions";
import styles from "./Home.module.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { startWatching, addToWatchlist, likeMovie } = useMovieActions();
  const [collections, setCollections] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [historyError, setHistoryError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    let active = true;
    request("/movies/home?type=movie")
      .then((data) => {
        if (active) setCollections(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    let active = true;
    request("/watch-history/continue-watching")
      .then(({ items }) => {
        if (active) setHistory(items);
      })
      .catch((requestError) => {
        if (active) setHistoryError(requestError.message);
      })
      .finally(() => {
        if (active) setHistoryLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  const handlePlay = (movie) => startWatching(movie);

  const featured = collections?.featured;

  return (
    <main className={styles.home}>
      <Navbar />

      <section
        className={styles.hero}
        style={
          featured?.backdrop || featured?.image
            ? {
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,.92), rgba(0,0,0,.12)), url("${featured.backdrop || featured.image}")`,
              }
            : undefined
        }
      >
        <div className={styles.heroContent}>
          <ApiFeedback loading={!collections && !error} error={error} />
          {featured && (
            <>
              <p className={styles.eyebrow}>FEATURED MOVIE</p>
              <h1>{featured.title}</h1>
              <div className={styles.meta}>
                <span>{featured.year}</span>
                <span>{featured.rating}</span>
                <span>{featured.duration}</span>
                <span>HD</span>
              </div>
              <p className={styles.description}>{featured.description}</p>
              <div className={styles.buttons}>
                <button className={styles.playButton} onClick={() => handlePlay(featured)}>
                  <i className="bi bi-play-fill me-1" /> Play
                </button>
                <Link to={`/movie/${featured.id}`} className={styles.infoButton}>
                  More Info
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {isAuthenticated && (
        <ContinueWatching
          movies={history}
          loading={historyLoading}
          error={historyError}
          onPlay={handlePlay}
        />
      )}

      {collections && (
        <>
          <MovieRow
            title="Trending Now"
            movies={collections.trending}
            onPlay={handlePlay}
            onAdd={addToWatchlist}
            onLike={likeMovie}
          />
          <MovieRow
            title="Popular Movies"
            movies={collections.popular}
            onPlay={handlePlay}
            onAdd={addToWatchlist}
            onLike={likeMovie}
          />
          <MovieRow
            title="Top Rated"
            movies={collections.topRated}
            onPlay={handlePlay}
            onAdd={addToWatchlist}
            onLike={likeMovie}
          />
        </>
      )}
    </main>
  );
};

export default Home;
