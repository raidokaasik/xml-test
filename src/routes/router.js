const express = require("express");
const router = express.Router();
const Parser = require("rss-parser");
const parser = new Parser();

router.get("/feed", (req, res) => {
  parser.parseURL(
    "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss",
    function (err, feed) {
      res.json(feed.items);
    }
  );
});

module.exports = router;
