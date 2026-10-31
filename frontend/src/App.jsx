import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Search from "./pages/Search/Search";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import MyList from "./pages/MyList/MyList";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import { AuthProvider } from "./auth/AuthContext";
import { useAuth } from "./auth/useAuth";

const GlobalNotice = () => {
  const { notice, clearNotice } = useAuth();
  if (!notice) return null;

  return (
    <div className={`alert alert-${notice.variant} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`} style={{ zIndex: 1100 }} role="alert">
      {notice.message}
      <button type="button" className="btn-close" aria-label="Close" onClick={clearNotice} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalNotice />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
