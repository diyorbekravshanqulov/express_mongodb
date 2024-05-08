const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/index.routes");
const error_handling_midleware = require("./middleware/error_handling_midleware");
const winston = require("winston");
const expressWinston = require("express-winston");
const { logger, errorLogger, express_logger } = require("./middleware/winstonLogger");

// const logger = require("./services/logger.service");

const PORT = config.get("port") || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express_logger)

app.use("/api", mainRouter);

// console.log("test");

app.use(
  errorLogger
  // expressWinston.errorLogger({
  //   transports: [new winston.transports.Console()],
  //   format: winston.format.combine(
  //     winston.format.colorize(),
  //     winston.format.json()
  //   ),
  // })
);

app.use(error_handling_midleware); // of course in the end

async function start() {
  try {
    await mongoose.connect(config.get("dataUri"));
    app.listen(PORT, console.log(`http://127.0.0.1:${PORT}`));
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

start();
