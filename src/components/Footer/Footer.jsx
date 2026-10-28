import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid px-4 px-md-5 py-5">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-12 col-md-4 col-lg-3">
            <h2 className={styles.logo}>Orvixa</h2>

            <p className="text-secondary small mb-4">
              Your destination for movies, series and unforgettable
              entertainment.
            </p>

            <div className="d-flex gap-3">
              <a href="/" className={styles.social} aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="/" className={styles.social} aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="/" className={styles.social} aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="/" className={styles.social} aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-6 col-md-4 col-lg-2">
            <h3 className={styles.heading}>Explore</h3>

            <div className="d-flex flex-column gap-2">
              <a href="/" className={styles.link}>Home</a>
              <a href="/movies" className={styles.link}>Movies</a>
              <a href="/tv-shows" className={styles.link}>TV Shows</a>
              <a href="/my-list" className={styles.link}>My List</a>
            </div>
          </div>

          {/* Support */}
          <div className="col-6 col-md-4 col-lg-2">
            <h3 className={styles.heading}>Support</h3>

            <div className="d-flex flex-column gap-2">
              <a href="/" className={styles.link}>Help Center</a>
              <a href="/" className={styles.link}>Contact Us</a>
              <a href="/" className={styles.link}>Privacy</a>
              <a href="/" className={styles.link}>Terms</a>
            </div>
          </div>

          {/* Download */}
          <div className="col-12 col-lg-4">
            <h3 className={styles.heading}>Get the App</h3>

            <p className="text-secondary small">
              Watch your favorite movies and shows anywhere.
            </p>

            <div className="d-flex gap-2 flex-wrap">
              <button className={styles.appButton}>
                <i className="bi bi-google-play"></i>

                <span>
                  <small>GET IT ON</small>
                  Google Play
                </span>
              </button>

              <button className={styles.appButton}>
                <i className="bi bi-apple"></i>

                <span>
                  <small>DOWNLOAD ON THE</small>
                  App Store
                </span>
              </button>
            </div>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="text-secondary small mb-0">
            © 2026 Orvixa. All rights reserved.
          </p>

          <p className="text-secondary small mb-0">
            Made for entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;