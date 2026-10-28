import Navbar from "../../components/Navbar/Navbar";
import MovieRow from "../../components/MovieRow/MovieRow";
import ContinueWatching from "../../components/ContinueWatching/ContinueWatching";
import movies from "../../data/movie.js";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.home}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>NETFLIX ORIGINAL</p>

          <h1>STRANGER THINGS</h1>

          <div className={styles.meta}>
            <span>2025</span>
            <span>16+</span>
            <span>5 Seasons</span>
            <span>HD</span>
          </div>

          <p className={styles.description}>
            When a young boy disappears, his friends, family and a local police
            chief begin a desperate search. Their journey leads them into a
            mysterious world filled with strange secrets.
          </p>

          <div className={styles.buttons}>
            <button className={styles.playButton}>▶ Play</button>

            <button className={styles.infoButton}>ⓘ More Info</button>
          </div>
        </div>
      </section>

      <ContinueWatching movies={movies} />

      <MovieRow title="Trending Now" movies={movies} />
      <MovieRow title="Popular Movies" movies={movies} />
      <MovieRow title="Top Rated" movies={movies} />
    </main>
  );
};

export default Home;
