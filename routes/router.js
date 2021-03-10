const express = require("express");
const router = express.Router();

const Mercury = require("@postlight/mercury-parser");
const Parser = require("rss-parser");
const parser = new Parser();

router.get("/feed", (req, res) => {
  parser.parseURL(
    "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss",
    function (err, feed) {
      const payload = [];
      res.json(feed.items);

      // loadData = async () => {
      //   for (let item in feed.items) {
      //     await Mercury.parse(feed.items[item].link).then((result) =>
      //       payload.push({ result })
      //     );
      //   }
      // };
      // loadData().then(() =>
      //   res.json({ content: payload, initialData: feed.items })
      // );
    }
  );

  router.post("/details", (req, res) => {
    console.log(req.body.payload);
    loadData = async () => {
      await Mercury.parse(req.body.payload, {
        contentType: "html",
      }).then(result => res.json(result));
    };
    loadData();
  });
});

module.exports = router;
