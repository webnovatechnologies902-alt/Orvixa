import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header
      className={`${styles.navbar} d-flex align-items-center justify-content-between`}
    >
      {/* Left */}
      <div className="d-flex align-items-center gap-5">
        <div className={styles.logo}>Orvixa</div>

        <nav className="d-flex align-items-center gap-4">
          <a href="/" className={styles.navLink}>
            Home
          </a>

          <a href="/tv-shows" className={styles.navLink}>
            TV Shows
          </a>

          <a href="/Movies" className={styles.navLink}>
            Movies
          </a>

          <a href="/" className={styles.navLink}>
            New & Popular
          </a>

          <a href="/my-list" className={styles.navLink}>
            My List
          </a>
        </nav>
      </div>

      {/* Right */}
      <div className="d-flex align-items-center gap-4">
        <a href="/search" className={styles.iconButton} aria-label="Search">
          <i className="bi bi-search"></i>
        </a>

        <button className={styles.kidsButton}>Kids</button>

        <button className={styles.iconButton} aria-label="Notifications">
          <i className="bi bi-bell"></i>
        </button>

        <a href="/profile" className={styles.profile} aria-label="Profile">
          <i className={`bi bi-person-circle ${styles.profileIcon}`}></i>
          <i className={`bi bi-chevron-down ${styles.arrow}`}></i>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
// import { useState } from "react";
// import styles from "./Navbar.module.css";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <header
//       className={`${styles.navbar} d-flex align-items-center justify-content-between`}
//     >
//       {/* Logo */}
//       <div className="d-flex align-items-center">
//         <div className={styles.logo}>Orvixa</div>

//         {/* Desktop Navigation */}
//         <nav className={`${styles.desktopNav} d-flex align-items-center gap-4`}>
//           <a href="/" className={styles.navLink}>
//             Home
//           </a>

//           <a href="/tv-shows" className={styles.navLink}>
//             TV Shows
//           </a>

//           <a href="/movies" className={styles.navLink}>
//             Movies
//           </a>

//           <a href="/" className={styles.navLink}>
//             New & Popular
//           </a>

//           <a href="/my-list" className={styles.navLink}>
//             My List
//           </a>
//         </nav>
//       </div>

//       {/* Desktop Right Side */}
//       <div className={`${styles.desktopRight} d-flex align-items-center gap-4`}>
//         <a href="/search" className={styles.iconButton} aria-label="Search">
//           <i className="bi bi-search"></i>
//         </a>

//         <button className={styles.kidsButton}>Kids</button>

//         <button className={styles.iconButton} aria-label="Notifications">
//           <i className="bi bi-bell"></i>
//         </button>

//         <a href="/profile" className={styles.profile} aria-label="Profile">
//           <i className={`bi bi-person-circle ${styles.profileIcon}`}></i>
//           <i className={`bi bi-chevron-down ${styles.arrow}`}></i>
//         </a>
//       </div>

//       {/* Mobile Hamburger */}
//       <button
//         type="button"
//         className={styles.mobileMenuButton}
//         onClick={() => setMenuOpen(!menuOpen)}
//         aria-label="Toggle navigation"
//       >
//         <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
//       </button>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className={styles.mobileMenu}>
//           <a href="/" className={styles.mobileNavLink} onClick={closeMenu}>
//             Home
//           </a>

//           <a
//             href="/tv-shows"
//             className={styles.mobileNavLink}
//             onClick={closeMenu}
//           >
//             TV Shows
//           </a>

//           <a
//             href="/movies"
//             className={styles.mobileNavLink}
//             onClick={closeMenu}
//           >
//             Movies
//           </a>

//           <a href="/" className={styles.mobileNavLink} onClick={closeMenu}>
//             New & Popular
//           </a>

//           <a
//             href="/my-list"
//             className={styles.mobileNavLink}
//             onClick={closeMenu}
//           >
//             My List
//           </a>

//           <div className={styles.mobileDivider}></div>

//           <a
//             href="/search"
//             className={styles.mobileNavLink}
//             onClick={closeMenu}
//           >
//             <i className="bi bi-search me-2"></i>
//             Search
//           </a>

//           <a
//             href="/profile"
//             className={styles.mobileNavLink}
//             onClick={closeMenu}
//           >
//             <i className="bi bi-person-circle me-2"></i>
//             Profile
//           </a>

//           <button
//             type="button"
//             className={styles.mobileNavLink}
//             onClick={closeMenu}
//           >
//             <i className="bi bi-bell me-2"></i>
//             Notifications
//           </button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;