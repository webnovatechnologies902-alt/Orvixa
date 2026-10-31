import { useNavigate } from "react-router-dom";

import { request } from "../api/client";
import { useAuth } from "../auth/useAuth";

const useMovieActions = () => {
  const { isAuthenticated, showNotice } = useAuth();
  const navigate = useNavigate();

  const requireSignIn = () => {
    showNotice("Sign in to save titles and watch history.", "warning");
    navigate("/login");
    return false;
  };

  const addToWatchlist = async (movie) => {
    if (!isAuthenticated) return requireSignIn();
    try {
      await request("/watchlist", {
        method: "POST",
        body: { movieId: movie.id },
      });
      showNotice(`${movie.title} was added to My List.`, "success");
      return true;
    } catch (error) {
      showNotice(error.message);
      return false;
    }
  };

  const likeMovie = async (movie) => {
    if (!isAuthenticated) return requireSignIn();
    try {
      await request(`/likes/${encodeURIComponent(movie.id)}`, { method: "PUT" });
      showNotice(`You liked ${movie.title}.`, "success");
      return true;
    } catch (error) {
      showNotice(error.message);
      return false;
    }
  };

  const startWatching = async (movie) => {
    if (!isAuthenticated) return requireSignIn();
    try {
      await request("/watch-history", {
        method: "PUT",
        body: {
          movieId: movie.id,
          progressSeconds: movie.progressSeconds || 0,
          ...(movie.durationSeconds ? { durationSeconds: movie.durationSeconds } : {}),
        },
      });
      showNotice(
        "Watch history started. Progress will update when playback progress is available.",
        "success"
      );
      return true;
    } catch (error) {
      showNotice(error.message);
      return false;
    }
  };

  return { addToWatchlist, likeMovie, startWatching };
};

export default useMovieActions;
