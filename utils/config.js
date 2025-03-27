require("dotenv").config();

const PORT = process.env.PORT || 3003;

// const POSTGRES_URI =
//   process.env.NODE_ENV === "test"
//     ? process.env.TEST_POSTGRES_URI
//     : process.env.PRODUCTION_POSTGRES_URI;

if (process.env.NODE_ENV === "test") {
  POSTGRES_URI = process.env.TEST_POSTGRES_URI;
} else if (process.env.NODE_ENV != "test" && process.env.NODE_ENV === undefined) {
  POSTGRES_URI = process.env.TEST_POSTGRES_URI;
} else {
  POSTGRES_URI = process.env.PRODUCTION_POSTGRES_URI;
}

module.exports = {
  PORT,
  POSTGRES_URI,
};
