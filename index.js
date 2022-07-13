const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const app = express();
require("dotenv").config();
require('./models/db');
const videoRoute = require("./routes/video");
const userRoute = require("./routes/user");

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

//routes
app.use("/api/videos", videoRoute);
app.use("/api/user", userRoute);


//start server
app.listen(PORT, () => {
  logger.info(`Server started at PORT ${PORT}`);
});
