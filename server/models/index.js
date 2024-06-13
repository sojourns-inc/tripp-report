const express = require("express");
const router = express.Router();
const blog = require("./blog/"),
  persons = require('./persons/'),
  articles = require('./articles/'),
  effects = require("./effects/"),
  replications = require("./replications/"),
  users = require("./users/"),
  invitations = require("./invitations/"),
  profiles = require("./profiles/"),
  reports = require("./reports/"),
  server = require("./server/"),
  search = require("./search/"),
  redirects = require("./redirects"),
  otps = require("./otps/");

const errorHandler = function(err, req, res, next) {
  if (err["type"] === "API") {
    let error = { name: err["name"], message: err["message"] };
    res.status(err["code"]).send({ error });
  } else if (err.name == 'UnauthorizedError') {
    let error = { name: "Invalid JWT", message: "The JWT is invalid." };
    res.status(401).send({ error });
  } else {
    console.log(err);
    res.status(500).send(err);
  }
};


router
  .use("/persons", persons)
  .use("/articles", articles)
  .use("/blog", blog)
  .use("/effects", effects)
  .use("/replications", replications)
  .use("/users", users)
  .use("/invitations", invitations)
  .use("/profiles", profiles)
  .use("/reports", reports)
  .use("/server", server)
  .use("/search", search)
  .use("/redirects", redirects)
  .use("/otps", otps)

  .use(errorHandler);


module.exports = router;
