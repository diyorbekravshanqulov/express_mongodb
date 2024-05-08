const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/index.routes");
const error_handling_midleware = require("./middleware/error_handling_midleware");
const exHbs = require("express-handlebars");
const viewRouter = require("./routes/view.routes")

// const PORT = config.get("port") || 3030;
const PORT = 9090;

const app = express();

app.use(express.json());
app.use(cookieParser());

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: " hbs",
});

app.set("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static("views"));

app.use("/", viewRouter)
app.use("/api", mainRouter);

app.use(error_handling_midleware);

async function start() {
  try {
    await mongoose.connect(config.get("dataUri"));
    app.listen(PORT, console.log(`http://127.0.0.1:${PORT}`));
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

start();
