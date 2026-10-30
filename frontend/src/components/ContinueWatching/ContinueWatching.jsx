import styles from "./ContinueWatching.module.css";

const ContinueWatching = ({ movies }) => {
  return (
    <section className={`container-fluid px-4 px-md-5 py-4 ${styles.section}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 fs-4 fw-semibold">Continue Watching</h2>

        <button
          type="button"
          className={`btn btn-link text-light p-0 ${styles.viewAll}`}
        >
          View All
          <i className="bi bi-chevron-right ms-1"></i>
        </button>
      </div>

      <div className="row g-3 flex-nowrap overflow-auto pb-2">
        {movies.slice(0, 5).map((movie, index) => (
          <div
            className="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2"
            key={movie.id}
          >
            <div className={styles.card}>
              <div className="position-relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className={`w-100 ${styles.image}`}
                />

                {/* Play button */}
                <button
                  type="button"
                  className={`btn btn-light rounded-circle position-absolute top-50 start-50 translate-middle ${styles.playButton}`}
                  aria-label={`Play ${movie.title}`}
                >
                  <i className="bi bi-play-fill"></i>
                </button>

                {/* Progress */}
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${55 + index * 8}%`,
                    }}
                  />
                </div>
              </div>

              <div className="p-3">
                <h3 className="fs-6 fw-semibold mb-2 text-truncate">
                  {movie.title}
                </h3>

                <div className="d-flex gap-2 text-secondary small">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatching;