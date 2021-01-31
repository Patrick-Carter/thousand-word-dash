const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const HttpError = require("./models/http-error");
const db = require("./util/dbConnection");
const { applyExtraSetup } = require("./util/extraSetup");

const userRoutes = require("./routes/user-routes");
const etosRoutes = require("./routes/etos-routes");
const stoeRoutes = require("./routes/stoe-routes");
const learnedRoutes = require("./routes/learned-routes");
const quizRoutes = require("./routes/quiz-routes");
const settingsRoutes = require("./routes/settings-routes");
const checkAuth = require("./util/checkAuth");

const server = express();

applyExtraSetup();

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

server.use(express.json());

server.use(express.static(path.join("public")));

server.use("/api/user", userRoutes);

server.use(checkAuth);

server.use("/api/settings", settingsRoutes);

server.use("/api/etos", etosRoutes);

server.use("/api/stoe", stoeRoutes);

server.use("/api/quiz", quizRoutes);

server.use("/api/learned", learnedRoutes);

server.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

/*
server.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  throw error;
});
*/

server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

server.listen(5000);
