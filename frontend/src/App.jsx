import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Search from "./pages/Search/Search";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import MyList from "./pages/MyList/MyList";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
         <Footer />
    </BrowserRouter>
  );
}

export default App;
