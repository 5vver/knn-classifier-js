// define require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
/** Project import files */
import {fillAndPredictByMany, fillAndPredictByOne} from "./src/predictionProcess.js";
import { teaCoffeeTestData } from "./src/utils/coffeeTeaMeta.js";

require("dotenv").config();
/** Express */
const express = require("express");
const app = express();
const port = process.env.PORT;
/** Body parser */
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/** CORS */
const cors = require('cors');
app.use(cors());

app.post("/api", (req, res) => {
  if (!req.body.data) return res.send("No data provided");
  const result = fillAndPredictByOne(teaCoffeeTestData, JSON.parse(req.body.data));
  res.send(JSON.stringify(result));
});

app.get("/api", (req, res) => {
  res.send("GET request");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
