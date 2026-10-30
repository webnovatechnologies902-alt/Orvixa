import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "TV Shows", href: "/tv-shows" },
  { label: "Movies", href: "/movies" },
  { label: "New & Popular", href: "/new-and-popular" }, // change to your real route
  { label: "My List", href: "/my-list" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Close the sidebar with the Escape key
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Stop the page behind the sidebar from scrolling
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // If the window grows to desktop size, close the sidebar
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");

    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header className={styles.navbar}>
        {/* Left: logo + desktop links */}
        <div className={styles.left}>
          <a href="/" className={styles.logo}>
            Orvixa
          </a>

          <nav className={styles.desktopNav} aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: desktop actions */}
        <div className={styles.right}>
          <a href="/search" className={styles.iconButton} aria-label="Search">
            <i className="bi bi-search"></i>
          </a>

          <button type="button" className={styles.kidsButton}>
            Kids
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Notifications"
          >
            <i className="bi bi-bell"></i>
          </button>

          <a href="/profile" className={styles.profile} aria-label="Profile">
            <i className="bi bi-person-circle"></i>
            <i className={`bi bi-chevron-down ${styles.arrow}`}></i>
          </a>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-sidebar"
        >
          <i className="bi bi-list"></i>
        </button>
      </header>

      {/* Dark overlay behind the sidebar */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ""}`}
        onClick={closeMenu}
      />

      {/* Sidebar (mobile only) */}
      <aside
        id="mobile-sidebar"
        className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
        aria-label="Menu"
      >
        <div className={styles.sidebarHeader}>
          <a href="/" className={styles.logo} onClick={closeMenu}>
            Orvixa
          </a>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav className={styles.sidebarNav} aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.sidebarLink}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          <div className={styles.divider}></div>

          <a href="/search" className={styles.sidebarLink} onClick={closeMenu}>
            <i className="bi bi-search"></i>
            Search
          </a>

          <button
            type="button"
            className={styles.sidebarLink}
            onClick={closeMenu}
          >
            <i className="bi bi-bell"></i>
            Notifications
          </button>

          <button
            type="button"
            className={styles.sidebarLink}
            onClick={closeMenu}
          >
            <i className="bi bi-emoji-smile"></i>
            Kids
          </button>

          <a href="/profile" className={styles.sidebarLink} onClick={closeMenu}>
            <i className="bi bi-person-circle"></i>
            Profile
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;