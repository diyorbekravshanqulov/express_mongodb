const expressWinston = require("express-winston");
const config = require("config");
const winston = require("winston");
require("winston-mongodb");

const express_logger = expressWinston.logger({
  transports: [
    new winston.transports.MongoDB({
      db: config.get("dataUri"),
      options: { useUnifiedTopology: true },
    }),
    new winston.transports.Console(),
  ],

  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.timestamp(),
    winston.format.metadata()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) {
    return false;
  },
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "log/errorLogger.log",
      level: "error",
    }),
  ],
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.timestamp(),
    winston.format.metadata()
  ),
});

module.exports = {
  express_logger,
  errorLogger,
};
