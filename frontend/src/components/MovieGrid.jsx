import MovieCard from "./MovieCard/MovieCard";

const MovieGrid = ({ movies, onPlay, onAdd, onLike }) => (
  <div className="row g-3 g-md-4">
    {movies.map((movie) => (
      <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
        <MovieCard
          movie={movie}
          onPlay={onPlay}
          onAdd={onAdd}
          onLike={onLike}
        />
      </div>
    ))}
  </div>
);

export default MovieGrid;
