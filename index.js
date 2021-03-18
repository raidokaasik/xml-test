const express = require("express");
const routes = require("./routes/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
if (process.env.NODE_ENV === "production")
  app.use(express.static("client/build"));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Kuku raadio " + PORT));
