const express = require("express");
const Parser = require("rss-parser");
const routes = require("./routes/router.js");

const app = express();
const parser = new Parser();

// app.get("/", (req, res) => {
//   const url = "";
//   parser.parseURL(
//     "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss",
//     function (err, feed) {
//       res.json(feed);
//     }
//   );
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Kuku raadio " + PORT));
