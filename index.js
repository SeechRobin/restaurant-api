const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID; // we will use this later
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function(req, res) {
  res.send("Yep it's working");
});

MongoClient.connect(
  "mongodb://user:abc123@ds233323.mlab.com:33323/open-table",
  { useNewUrlParser: true },
  (err, db) => {
    let dbase = db.db("open-table");

    app.get("/api/1/menu", (req, res) => {
      dbase
        .collection("menu")
        .find()
        .toArray((err, results) => {
          res.send(results);
        });
    });

    if (err) return console.log(err);
    app.listen(3030, () => {
      console.log("app working on 3030");
    });
  }
);
