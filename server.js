const express = require("express");
const app = express();
const Parser = require("rss-parser");
const parser = new Parser();

app.get("/", (req, res) => {
  const url = "";
  parser.parseURL(
    "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss",
    function (err, feed) {
      res.json(feed);
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Kuku raadio " + PORT));
