const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const app = express();
require('./models/db');
const videoRoute = require("./routes/video");

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/videos", videoRoute);

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



//start server
app.listen(PORT, () => {
  logger.info(`Server started at PORT ${PORT}`);
});
