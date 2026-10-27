import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header
      className={`${styles.navbar} d-flex align-items-center justify-content-between`}
    >
      {/* Left */}
      <div className="d-flex align-items-center gap-5">
        <div className={styles.logo}>
          Orvixa
        </div>

        <nav className="d-flex align-items-center gap-4">
          <a href="/" className={styles.navLink}>
            Home
          </a>

          <a href="/" className={styles.navLink}>
            TV Shows
          </a>

          <a href="/" className={styles.navLink}>
            Movies
          </a>

          <a href="/" className={styles.navLink}>
            New & Popular
          </a>

          <a href="/" className={styles.navLink}>
            My List
          </a>
        </nav>
      </div>

      {/* Right */}
      <div className="d-flex align-items-center gap-4">

        <button
          className={styles.iconButton}
          aria-label="Search"
        >
          <i className="bi bi-search"></i>
        </button>

        <button className={styles.kidsButton}>
          Kids
        </button>

        <button
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <i className="bi bi-bell"></i>
        </button>

        <button
          className={`${styles.profileButton} d-flex align-items-center gap-2`}
        >
          <i className="bi bi-person-circle"></i>

          <i className="bi bi-chevron-down"></i>
        </button>

      </div>
    </header>
  );
};

export default Navbar;