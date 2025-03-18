// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require("./middleware/logger");
const config = require("./utils/config");
const { morganLogger, requestLogger, unknownEndpoint } = require("./middleware/middleware");
const errorHandler = require("./middleware/errorHandler");
// const authorize = require("./middleware/authorization");

const testRouter = require("./modules/test/test.router"); // If implemented

const app = express();

logger.info("Connecting to PostgreSQL at", config.POSTGRES_URI);

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging Middlewares
if (process.env.NODE_ENV !== "test") {
  app.use(morganLogger);
  app.use(requestLogger);
}

if (process.env.NODE_ENV === "test") {
  app.use("/api/test", testRouter);
}

// Handle Unknown Endpoints
app.use(unknownEndpoint);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
