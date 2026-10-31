const express = require("express");

const validate = require("../middleware/validation.middleware");
const { authenticate, authorizeRoles } = require("../middleware/auth.middleware");
const movieController = require("../controllers/movie.controller");
const {
  createMovieSchema,
  updateMovieSchema,
  movieIdSchema,
  movieListQuerySchema,
  movieTypeQuerySchema,
  movieGenresQuerySchema,
} = require("../validation/movie.validation");

const router = express.Router();

router.get("/", validate(movieListQuerySchema, "query"), movieController.listMovies);
router.get("/home", validate(movieTypeQuerySchema, "query"), movieController.getHomeCollections);
router.get("/genres", validate(movieGenresQuerySchema, "query"), movieController.listGenres);
router.get("/:id", validate(movieIdSchema, "params"), movieController.getMovie);

router.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validate(createMovieSchema),
  movieController.createMovie
);
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validate(movieIdSchema, "params"),
  validate(updateMovieSchema),
  movieController.updateMovie
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validate(movieIdSchema, "params"),
  movieController.archiveMovie
);

module.exports = router;