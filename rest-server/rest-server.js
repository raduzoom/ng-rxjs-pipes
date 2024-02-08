const express = require("express");
const fs = require("fs");
const cors = require('cors');
const app = express();
const port = 3513;
const https = require("https");
const cookieParser = require("cookie-parser");
const fileHelpers = require("./node-helpers/file-helpers.util");
const {setupComplexCalls} = require("./extra/complex-calls");
const homedir = require("os").homedir();
app.use(cookieParser());
app.use(cors())


setupComplexCalls(app);


app.get("/applicationSettings", (req, res) => {

  res.setHeader("Content-Type", "application/json");


  const filename = "applicationSettings.json";
  fileHelpers.readFile(__dirname, filename, res);
});


app.get("/error-400", (req, res) => {

  res.setHeader("Content-Type", "application/json");


  res.status(400);

  const errorJson = {
    "errors": [
      {
        "status": "422",
        "source": { "pointer": "/data/attributes/firstName" },
        "title":  "Invalid Attribute",
        "detail": "First name must contain at least two characters."
      }
    ]
  };
  res.send(errorJson)
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
