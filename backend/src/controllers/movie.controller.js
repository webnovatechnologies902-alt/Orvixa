const asyncHandler = require("../utils/asyncHandler");
const movieService = require("../services/movie.service");

const listMovies = asyncHandler(async (req, res) => {
  const data = await movieService.listMovies(req.validatedQuery);
  res.status(200).json({ success: true, data });
});

const getHomeCollections = asyncHandler(async (req, res) => {
  const data = await movieService.listHomeCollections(req.validatedQuery.type || "movie");
  res.status(200).json({ success: true, data });
});

const listGenres = asyncHandler(async (req, res) => {
  const genres = await movieService.listGenres(req.validatedQuery.type);
  res.status(200).json({ success: true, data: { genres } });
});

const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.getMovie(req.params.id);
  res.status(200).json({ success: true, data: { movie } });
});

const createMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.createMovie(req.body);
  res.status(201).json({
    success: true,
    message: "Movie or show created successfully",
    data: { movie },
  });
});

const updateMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.updateMovie(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Movie or show updated successfully",
    data: { movie },
  });
});

const archiveMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.archiveMovie(req.params.id);
  res.status(200).json({
    success: true,
    message: "Movie or show archived successfully",
    data: { movie },
  });
});

module.exports = {
  listMovies,
  getHomeCollections,
  listGenres,
  getMovie,
  createMovie,
  updateMovie,
  archiveMovie,
};
