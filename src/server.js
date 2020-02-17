/**
 * @Date:   2020-02-17T16:21:52+00:00
 * @Last modified time: 2020-02-17T16:22:25+00:00
 */



const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
