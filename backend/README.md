# Orvixa API

The API is mounted at `/api/v1`. Protected endpoints require
`Authorization: Bearer <token>`. Successful responses use `{ success, data }`;
errors use `{ success: false, message }`.

## Authentication and account

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | Register; returns a user and bearer token |
| POST | `/auth/login` | Sign in; returns a user and bearer token |
| POST | `/auth/logout` | Sign out and invalidate existing tokens |
| GET | `/users/me` | Get the signed-in profile |
| PATCH | `/users/me` | Update `name`, `email`, or `avatar` |
| PATCH | `/users/me/password` | Change password using `currentPassword` and `newPassword` |
| PATCH | `/users/me/preferences` | Update `language`, `playbackQuality`, or `notificationsEnabled` |

## Catalog, search, and detail

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/movies` | Browse/search; supports `type=movie|tv`, `genre`, `search` (or `q`), `sort=trending|popular|top-rated|newest`, `page`, and `limit` |
| GET | `/movies/home?type=movie` | Featured title and trending, popular, and top-rated collections |
| GET | `/movies/genres?type=movie` | Genres available for the selected type |
| GET | `/movies/:id` | Get a movie/show detail |

Movie IDs are MongoDB ObjectIds. Catalog writes require a signed-in admin:

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/movies` | Create a movie/show |
| PATCH | `/movies/:id` | Update a movie/show |
| DELETE | `/movies/:id` | Archive a movie/show without deleting user history |

Set a user's `role` to `admin` in MongoDB to grant catalog-management access.
Catalog records must be inserted or imported before browse endpoints return
titles.

To insert 100 fictional movies and 60 fictional TV series across their genres
with unique photographic poster and backdrop images into MongoDB, run
`npm run seed:movies` from the `backend` directory. The script is safe to rerun:
it inserts missing titles and refreshes the seeded image URLs on existing
records without overwriting their other fields. Images are served by Lorem
Picsum and require an internet connection in the client. It reports genre
counts and featured/trending/popular/top-rated collections separately for
movies and TV series.

## Personal list and playback

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/watchlist?type=movie` | List saved titles; `type` is optional |
| POST | `/watchlist` | Add `{ "movieId": "<ObjectId>" }` |
| DELETE | `/watchlist/:movieId` | Remove a saved title |
| GET | `/likes` | List liked titles |
| PUT | `/likes/:movieId` | Like a title |
| DELETE | `/likes/:movieId` | Remove a like |
| GET | `/watch-history` | List the signed-in user's playback history |
| GET | `/watch-history/continue-watching` | List unfinished titles with progress |
| PUT | `/watch-history` | Save `{ "movieId", "progressSeconds", "durationSeconds" }` |
| DELETE | `/watch-history/:movieId` | Remove one history entry |
| DELETE | `/watch-history` | Clear the signed-in user's history |

Progress is measured in seconds. `durationSeconds` may be omitted when it is
already set on the catalog record.
