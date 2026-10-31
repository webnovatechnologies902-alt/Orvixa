require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("../src/models/movie.model");

const catalog = [
  {
    genre: "Action",
    titles: [
      "A City Under Fire",
      "The Iron Meridian",
      "Midnight Extraction",
      "Redline Protocol",
      "The Last Outpost",
      "Rogue Signal",
      "Seven Seconds to Dawn",
      "The Silent Pursuit",
      "Point of Impact",
      "No Safe Harbor",
    ],
  },
  {
    genre: "Adventure",
    titles: [
      "Beyond the Amber Sea",
      "The Cartographer's Map",
      "Islands of the Lost Wind",
      "The Faraway Compass",
      "A Passage Through Clouds",
      "The Sunken Observatory",
      "Footprints in the Glass Desert",
      "The Northern Passage",
      "Across the Sapphire Divide",
      "The Uncharted Garden",
    ],
  },
  {
    genre: "Comedy",
    titles: [
      "Roommates by Accident",
      "The Weekend Committee",
      "A Very Small Emergency",
      "The Wrong Wedding Planner",
      "Neighbors on Paper",
      "The Great Office Bake-Off",
      "One More Family Photo",
      "The Helpful Stranger",
      "Auntie Runs the Town",
      "The Unexpected Houseguest",
    ],
  },
  {
    genre: "Drama",
    titles: [
      "Letters from Willow Street",
      "The Long Way Home",
      "A Season of Quiet",
      "When the Orchard Blooms",
      "The Shape of Tomorrow",
      "Rooms We Remember",
      "The Distance Between Us",
      "A Table for Sunday",
      "Small Hours, Open Doors",
      "The Year We Began Again",
    ],
  },
  {
    genre: "Thriller",
    titles: [
      "The Unmarked Floor",
      "A Borrowed Identity",
      "The House Across the Lake",
      "No One at Platform Nine",
      "The Last Recorded Call",
      "A Key Without a Door",
      "The Quiet Witness",
      "Before the Lights Return",
      "The Missing Hour",
      "Names in the Margins",
    ],
  },
  {
    genre: "Sci-Fi",
    titles: [
      "Orbit of the Forgotten",
      "The Memory Engine",
      "Tomorrow's Blue Sun",
      "Signal from Europa Station",
      "The Last Human Archive",
      "Cities Above the Clouds",
      "A Map of Other Earths",
      "The Sleeping Satellite",
      "After the First Contact",
      "The Infinite Room",
    ],
  },
  {
    genre: "Crime",
    titles: [
      "The Harbor Street Case",
      "A Ledger of Secrets",
      "The Night Clerk",
      "Evidence at Dawn",
      "The Borrowed Alibi",
      "Three Calls from Northbridge",
      "The Empty Evidence Room",
      "A Question of Motive",
      "The Paper Trail",
      "The Last Honest Detective",
    ],
  },
  {
    genre: "Documentary",
    titles: [
      "Life Along the Monsoon",
      "The Keepers of the Reef",
      "How a City Remembers",
      "The People Who Mend Things",
      "A Year with the Night Sky",
      "The Hidden Work of Rivers",
      "Voices from the High Valley",
      "The Future of Old Forests",
      "Inside the Moving Earth",
      "The Craft of Starting Over",
    ],
  },
  {
    genre: "Fantasy",
    titles: [
      "The Lantern Crown",
      "A Kingdom of Moss and Moonlight",
      "The Clockmaker's Familiar",
      "The River That Remembers",
      "The Orchard of Sleeping Stars",
      "A Door in the Mountain",
      "The Last Keeper of Fire",
      "The Mirrorwood Promise",
      "The Moonlit Archive",
      "A Song for the Stone Giants",
    ],
  },
  {
    genre: "Romance",
    titles: [
      "Coffee After the Rain",
      "The Bookshop on Linden Lane",
      "Postcards from the Coast",
      "A Recipe for Two",
      "The Train to Bellweather",
      "One Summer in Marigold Bay",
      "A Second First Date",
      "The Garden Next Door",
      "Meet Me at the Old Cinema",
      "The Last Dance at Seabrook",
    ],
  },
];

const tvCatalog = [
  {
    genre: "Drama",
    titles: [
      "The Quiet Harbor",
      "Willow Street",
      "A House of Many Seasons",
      "The Last Sunday Table",
      "Northbound",
      "The Orchard Years",
      "Small Town, Long Shadow",
      "The Open Door",
      "Rooms We Keep",
      "After the First Snow",
    ],
  },
  {
    genre: "Comedy",
    titles: [
      "The Breakroom",
      "Room for One More",
      "The Very Normal Neighbors",
      "Unfinished Business Hours",
      "Auntie Knows Best",
      "The Weekend Guests",
      "New Hire, Old Office",
      "The Good Enough Plan",
      "Flatmates Forever",
      "The Unofficial Committee",
    ],
  },
  {
    genre: "Crime",
    titles: [
      "Northbridge Detectives",
      "The Harbor Unit",
      "A Case for Sunday",
      "The Missing Ledger",
      "Cold Street",
      "Evidence Room",
      "The Night Shift Files",
      "Three Calls Later",
      "The Long Investigation",
      "Under Oath",
    ],
  },
  {
    genre: "Thriller",
    titles: [
      "The Silent Frequency",
      "No One Leaves at Dawn",
      "The Other Floor",
      "A Door Left Open",
      "The Last Safe House",
      "Hidden in Plain Sight",
      "The Unlisted Number",
      "Before the Sirens",
      "The Night Archive",
      "A Map of Missing People",
    ],
  },
  {
    genre: "Sci-Fi",
    titles: [
      "Europa Station",
      "The Memory Division",
      "Tomorrow's Horizon",
      "Signal Lost",
      "The Human Archive",
      "Orbit City",
      "The Second Earth",
      "After Contact",
      "The Far Side",
      "A Thousand Small Suns",
    ],
  },
  {
    genre: "Documentary",
    titles: [
      "Wild Coasts",
      "The Last Green Valley",
      "Inside the Workshop",
      "A Planet in Motion",
      "Lives of the River",
      "The Night Sky Project",
      "People Who Build",
      "Beneath the Canopy",
      "Our Changing Cities",
      "The Ocean Between Us",
    ],
  },
];

const makeMovie = (title, genre, index) => {
  const year = 2017 + ((index * 7) % 10);
  const durationMinutes = 88 + ((index * 13) % 65);
  const averageRating = Number((6.2 + ((index * 17) % 38) / 10).toFixed(1));
  const imageSeed = `orvixa-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return {
    title,
    type: "movie",
    year,
    rating: index % 4 === 0 ? "16+" : index % 3 === 0 ? "13+" : "PG-13",
    duration: `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`,
    durationSeconds: durationMinutes * 60,
    image: `https://picsum.photos/seed/${imageSeed}/600/900`,
    backdrop: `https://picsum.photos/seed/${imageSeed}/1600/900`,
    description: `${title} is an original ${genre.toLowerCase()} story about unexpected choices, unlikely allies, and the moment everything changes.`,
    genres: [genre],
    averageRating,
    isFeatured: index === 0,
    isTrending: index % 10 < 4,
    isPopular: index % 10 < 5,
    isTopRated: index % 10 < 3,
    isActive: true,
  };
};

const makeTvShow = (title, genre, index) => {
  const year = 2018 + ((index * 3) % 9);
  const seasons = 1 + (index % 5);
  const averageRating = Number((6.4 + ((index * 13) % 34) / 10).toFixed(1));
  const imageSeed = `orvixa-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return {
    title,
    type: "tv",
    year,
    rating: index % 4 === 0 ? "16+" : index % 3 === 0 ? "13+" : "TV-14",
    duration: `${seasons} Season${seasons === 1 ? "" : "s"}`,
    seasons,
    image: `https://picsum.photos/seed/${imageSeed}/600/900`,
    backdrop: `https://picsum.photos/seed/${imageSeed}/1600/900`,
    description: `${title} is an original ${genre.toLowerCase()} series filled with memorable characters, unexpected turns, and stories that unfold over time.`,
    genres: [genre],
    averageRating,
    isFeatured: index === 0,
    isTrending: index % 10 < 4,
    isPopular: index % 10 < 5,
    isTopRated: index % 10 < 3,
    isActive: true,
  };
};

const seedMovies = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined. Configure backend/.env before seeding.");
  }

  const movies = catalog.flatMap((category, genreIndex) =>
    category.titles.map((title, offset) =>
      makeMovie(title, category.genre, genreIndex * 10 + offset)
    )
  );
  const tvShows = tvCatalog.flatMap((category, genreIndex) =>
    category.titles.map((title, offset) =>
      makeTvShow(title, category.genre, genreIndex * 10 + offset)
    )
  );

  if (movies.length !== 100 || tvShows.length !== 60) {
    throw new Error(
      `Expected 100 movies and 60 TV shows, got ${movies.length} and ${tvShows.length}`
    );
  }

  await mongoose.connect(process.env.MONGO_URI);
  const seedTitles = [...movies, ...tvShows];
  const upsertTitles = (titles) =>
    Movie.bulkWrite(
      titles.map((movie) => ({
      updateOne: {
        filter: { title: movie.title, type: movie.type },
        update: {
          $set: {
            image: movie.image,
            backdrop: movie.backdrop,
          },
          $setOnInsert: Object.fromEntries(
            Object.entries(movie).filter(
              ([field]) => field !== "image" && field !== "backdrop"
            )
          ),
        },
        upsert: true,
      },
      })),
      { ordered: false }
    );
  const [movieResult, tvResult] = await Promise.all([
    upsertTitles(movies),
    upsertTitles(tvShows),
  ]);

  const genreCounts = await Movie.aggregate([
    {
      $match: {
        title: { $in: seedTitles.map(({ title }) => title) },
        isActive: true,
      },
    },
    { $unwind: "$genres" },
    {
      $group: {
        _id: { type: "$type", genre: "$genres" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const totalInserted = movieResult.upsertedCount + tvResult.upsertedCount;
  const existingCount = seedTitles.length - totalInserted;

  console.log(`Seed complete: ${totalInserted} inserted, ${existingCount} already present.`);
  console.log(`Movies: ${movieResult.upsertedCount} inserted this run, ${movies.length} expected.`);
  console.log(`TV shows: ${tvResult.upsertedCount} inserted this run, ${tvShows.length} expected.`);
  for (const type of ["movie", "tv"]) {
    const records = seedTitles.filter((item) => item.type === type);
    console.log(`${type === "tv" ? "TV " : ""}Featured: ${records.filter(({ isFeatured }) => isFeatured).length}`);
    console.log(`${type === "tv" ? "TV " : ""}Trending: ${records.filter(({ isTrending }) => isTrending).length}`);
    console.log(`${type === "tv" ? "TV " : ""}Popular: ${records.filter(({ isPopular }) => isPopular).length}`);
    console.log(`${type === "tv" ? "TV " : ""}Top rated: ${records.filter(({ isTopRated }) => isTopRated).length}`);
  }
  console.log("Active seeded titles by type and genre:");
  genreCounts.forEach(({ _id, count }) =>
    console.log(`- ${_id.type} / ${_id.genre}: ${count}`)
  );
};

seedMovies()
  .catch((error) => {
    console.error("Movie seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
