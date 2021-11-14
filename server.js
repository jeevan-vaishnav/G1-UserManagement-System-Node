const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path"); //inbuild path modues
const app = express();

const connectDB = require("./server/database/connection");

//PORT
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//morgon (log requests)
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parser request to ( body-parser)
app.use(bodyparser.urlencoded({ extended: true }));

//setView engines
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

//load my assets folder
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
//css/styles.css

//load routers
app.use("/", require("./server/routes/router"));

//listening the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
