const Movie = require("../models/movie.model");
const ApiError = require("../utils/ApiError");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const serializeMovie = (movie) => {
  const record = movie.toObject ? movie.toObject() : movie;
  const { _id, __v, ...fields } = record;

  return {
    id: _id.toString(),
    ...fields,
  };
};

const buildMovieFilter = ({ type, genre, search, q }) => {
  const filter = { isActive: true };
  if (type) filter.type = type;
  if (genre) filter.genres = new RegExp(`^${escapeRegex(genre)}$`, "i");

  const term = search || q;
  if (term) {
    const expression = new RegExp(escapeRegex(term), "i");
    filter.$or = [
      { title: expression },
      { description: expression },
      { genres: expression },
    ];
  }

  return filter;
};

const sortMovies = (sort) => {
  switch (sort) {
    case "trending":
      return { isTrending: -1, averageRating: -1, createdAt: -1 };
    case "popular":
      return { isPopular: -1, averageRating: -1, createdAt: -1 };
    case "top-rated":
      return { isTopRated: -1, averageRating: -1, createdAt: -1 };
    case "newest":
      return { year: -1, createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
};

const listMovies = async (filters) => {
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const query = buildMovieFilter(filters);
  const [movies, total] = await Promise.all([
    Movie.find(query)
      .sort(sortMovies(filters.sort))
      .skip((page - 1) * limit)
      .limit(limit),
    Movie.countDocuments(query),
  ]);

  return {
    movies: movies.map(serializeMovie),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const listHomeCollections = async (type) => {
  const filter = { isActive: true, type };
  const [featured, trending, popular, topRated] = await Promise.all([
    Movie.findOne({ ...filter, isFeatured: true }).sort({ averageRating: -1 }),
    Movie.find({ ...filter, isTrending: true }).sort({ averageRating: -1 }).limit(20),
    Movie.find({ ...filter, isPopular: true }).sort({ averageRating: -1 }).limit(20),
    Movie.find({ ...filter, isTopRated: true }).sort({ averageRating: -1 }).limit(20),
  ]);

  return {
    featured: featured ? serializeMovie(featured) : null,
    trending: trending.map(serializeMovie),
    popular: popular.map(serializeMovie),
    topRated: topRated.map(serializeMovie),
  };
};

const listGenres = async (type) => {
  const genres = await Movie.distinct("genres", {
    ...(type ? { type } : {}),
    isActive: true,
  });
  return genres.sort((first, second) => first.localeCompare(second));
};

const getMovie = async (id) => {
  const movie = await Movie.findOne({ _id: id, isActive: true });
  if (!movie) throw new ApiError(404, "Movie or show not found");
  return serializeMovie(movie);
};

const createMovie = async (movieData) => serializeMovie(await Movie.create(movieData));

const updateMovie = async (id, updates) => {
  const movie = await Movie.findOneAndUpdate(
    { _id: id, isActive: true },
    { $set: updates },
    { new: true, runValidators: true }
  );
  if (!movie) throw new ApiError(404, "Movie or show not found");
  return serializeMovie(movie);
};

const archiveMovie = async (id) => {
  const movie = await Movie.findOneAndUpdate(
    { _id: id, isActive: true },
    { $set: { isActive: false } },
    { new: true }
  );
  if (!movie) throw new ApiError(404, "Movie or show not found");
  return serializeMovie(movie);
};

module.exports = {
  listMovies,
  listHomeCollections,
  listGenres,
  getMovie,
  createMovie,
  updateMovie,
  archiveMovie,
  serializeMovie,
};